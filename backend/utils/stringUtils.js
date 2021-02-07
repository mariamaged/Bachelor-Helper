// For student page thesis.
const objectFromStudentItem = (thesis) => {
    const object = {};
    const array = thesis.split(/\s-(.+)/);

    object.thesisName = array[1].trim().replace(/\"/g, '');
    object.thesisSupervisor = array[0].trim().split('. ').join('');

    return object;
};

module.exports = {
    objectFromStudentItem
};