const binarySearch = (arr, x) => {

    let start = 0, end = arr.length - 1;

    // Iterate while start not meets end 
    while (start <= end) {

        // Find the mid index 
        let mid = Math.floor((start + end) / 2);

        let Student = x.toLowerCase();
        let MET = arr[mid].thesisName.toString().split(/\s[-–]\s/)[0].toLowerCase()
        .replace(' i & ii', '')
        .replace(' in vr', '');

        // If element is present at mid, return True 
        if (MET.startsWith(Student) || Student.startsWith(MET)) {
            return mid;
        }

        // Else look in left or right half accordingly 
        else if (arr[mid].thesisName < x)
            start = mid + 1;
        else
            end = mid - 1;
    }

    return -1;
}

const clone = (items) => items.map(item => Array.isArray(item) ? clone(item) : item);

module.exports = {
    binarySearch,
    clone
}