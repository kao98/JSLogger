
//Conflict detection
if (KNT && (KNT.author !== 'AR' || KNT.name !== 'Kao.Net')) {
    throw new Error('ERROR: conflict detected. Unable to create the KNT namespace.');
}

//KNT is a base namespace dedicated to prevent conflicts
var KNT = KNT || {
    author:     'AR',
    name:       'Kao.Net'
};
