// For environmental variables.
require('dotenv').config();

const cheerio = require('cheerio'),
    puppet = require('puppeteer'),
    fs = require('fs');

const { objectFromStudentItem } = require('../utils/stringUtils.js');
const { clone } = require('../utils/objectUtils.js');
const { read, write} = require('../utils/arrayUtils.js');
const { authorize, authorization } = require('../utils/authorizeUtils.js');

const loadDataJSON = async (page, id) => {
    await page.goto(id === 'Student' ? process.env.STUDENT_URL : id === 'MET' ? process.env.MET_URL : process.env.RESEARCH_JOURNAL_URL, {
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
        cheerio('div[class=topicBlock] > h2 > span', html)
            .each(function () {
                const metObject = {};

                const categorySpan = cheerio(this);
                const categorySpanID = categorySpan.attr('id');
                const relatedProjectsID = categorySpanID.replace("thesisTopicTitle", "bachelorProjectsRepeater");

                metObject.category = categorySpan.text();

                const description = categorySpan.parent().next();
                metObject.categoryDescription = description.text().trim();

                cheerio('span', html)
                    .filter(function () {
                        if (!cheerio(this).attr('id')) return false;
                        else return cheerio(this).attr('id').startsWith(relatedProjectsID) && cheerio(this).attr('id').endsWith('_bachelorProjectName');
                    })
                    .each(function () {
                        metObject.supervisors = []; metObject.assistantSupervisors = [];

                        const thesisSpan = cheerio(this);
                        const thesisDescription = thesisSpan.parent().next().children()[0];
                        const supervisors = thesisSpan.parent().next().next().next().next().children();
                        metObject.thesisDescription = cheerio(thesisDescription).text().trim();

                        supervisors.
                            each(function () {
                                const supervisor = cheerio(cheerio(this).children()[0]).text();
                                if (supervisor.startsWith('Prof.') || supervisor.startsWith('Dr.') || supervisor.startsWith('Assoc.'))
                                    metObject.supervisors.push(supervisor);
                                else
                                    metObject.assistantSupervisors.push(supervisor);
                            })

                        metObject.thesisName = thesisSpan.text().trim();
                        thesisList.push(clone(metObject));
                    })
            });
    }
    else {
        const studyGroups = cheerio('div[id=studygroups_ids]', html).children();
        studyGroups
            .filter(function () {
                const group = cheerio(this);
                if (group.is('input') &&
                    group.attr('id').startsWith('chbx_sg_') && group.attr('id') !== 'chbx_sg_1') return true;
            })
            .each(function () {
                cheerio(this).prop('checked', false);
            });

        const facultyGroups = cheerio('div[id=faculty_buttonset_1]', html).children();
        facultyGroups
            .filter(function () {
                const faculty = cheerio(this);
                if (faculty.is('input') &&
                    faculty.attr('id').startsWith('chbx_faculty_') && faculty.attr('id') !== 'chbx_faculty_22') return true;
            })
            .each(function () {
                cheerio(this).prop('checked', false);
            });

        await page.evaluate(() => {
            document.querySelector('#search_button').scrollIntoView();
            document.querySelector('#search_button').click();
        })
        
        await page.waitForFunction(function (selector) {
            return document.querySelector(selector).children.length > 0
        }, {}, '#results_div');
        console.log(cheerio('#results_div').children().length);

        var next = cheerio('div[id=results_div] > table > tbody > tr', html);
        //console.log(next);
        var counter = 0;
        while (next !== null && counter <= 100) {
            const resultsObject = {};
            const children = next.children();
            // console.log(children.length);
            // thesisList.push(resultsObject);
            // console.log(resultsObject);
            counter++;
            next = next.next();
        }
    }

    write(`./${id}.json`, thesisList);
}

const pupp_options = {
    headless: true,
    args: ["--proxy-server='direct://'", '--proxy-bypass-list=*', '--start-maximized']
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
    page.on('console', (msg) => console[msg._type]('PAGE LOG:', msg._text));

    // Load data.
    await loadDataJSON(page, 'Student');
    await loadDataJSON(page, 'MET');

}

main();