// For environmental variables.
require('dotenv').config();

const http = require('httpntlm'),
    cheerio = require('cheerio'),
    puppet = require('puppeteer'),
    fs = require('fs');

const { objectFromStudentItem } = require('../utils/stringUtils.js');

var authorization = {
    username: '',
    password: ''
}

//-----------------------------------------------------------------------------
const authorize = () => {
    return new Promise((resolve, reject) => {
        http.get(
            {
                ...authorization,
                url: process.env.HOMEPAGE_URL,
                rejectUnauthorized: false
            },
            (err, res) => {
                console.log(
                    res.statusCode === 200
                        ? 'You are authorized\n'
                        : 'You are not authroized\n'
                );
                resolve(res.statusCode === 200);
            }
        );
    });
};


const loadDataJSON = async (page, id) => {
    await page.goto(id === 'Student' ? process.env.STUDENT_URL : id === 'MET' ? process.env.MET_URL : RESEARCH_JOURNAL_URL, {
        waitUntil: 'networkidle0',
        timeout: 500000
    });
    const html = await page.content();

    const thesisList = [];
    if (id === 'Student') {
        cheerio('select[id=thesisIdLst] > option', html).each(function () {
            thesisList.push(objectFromStudentItem(cheerio(this).text()));
        });
    }
    else if (id === 'MET') {
        cheerio('div[class=topicBlock] > h2 > span', html).each(function () {
            const metObject = {};

            const categorySpan = cheerio(this);
            const categorySpanID = categorySpan.attr('id');
            const relatedProjectsID = categorySpanID.replace("thesisTopicTitle", "bachelorProjectsRepeater");

            metObject.category = categorySpan.text();

            const description = categorySpan.parent().next();
            metObject.categoryDescription = description.text().trim();

            cheerio('span', html).filter(function () {
                if (!cheerio(this).attr('id')) return false; else return cheerio(this).attr('id').startsWith(relatedProjectsID) && cheerio(this).attr('id').endsWith('_bachelorProjectName');
            })
                .each(function () {
                    metObject.supervisor = [];

                    const thesisSpan = cheerio(this);
                    const thesisDescription = thesisSpan.parent().next().children()[0];
                    const supervisors = thesisSpan.parent().next().next().next().next().children();
                    metObject.thesisDescription = cheerio(thesisDescription).text().trim();

                    supervisors.each(function () {
                        const supervisor = cheerio(cheerio(this).children()[0]).text();
                        if (supervisor.startsWith('Prof.') || supervisor.startsWith('Dr.') || supervisor.startsWith('Assoc.'))
                            metObject.supervisor.push(supervisor);
                        else
                            metObject.assistantSupervisor = supervisor;
                    })

                    metObject.thesisName = thesisSpan.text();
                    console.log(metObject);
                    // thesisList.push(metObject);
                })
        });
        console.log(thesisList);
    }
    else {

    }

    const file = './' + id + '.json';
    fs.writeFile(file, JSON.stringify(thesisList, null, 4), err => {
        if (err) throw err;
    });
}

const pupp_options = {
    headless: true,
    args: ["--proxy-server='direct://'", '--proxy-bypass-list=*']
};

const main = async () => {
    const browser = await puppet.launch(pupp_options);
    const page = await browser.newPage();

    // Authenticate User
    console.log('Currently Authenticating. Please wait..');
    let user_auth = await authorize();
    if (!user_auth) {
        await browser.close();
        return;
    }

    // Authenticate GETs
    await page.authenticate(authorization);

    // Load data.
    await loadDataJSON(page, 'MET');

}

main();