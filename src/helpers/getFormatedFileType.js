
export default function getFormatedFileType(fileType) {
    fileType = fileType.split("/")[1];
    let type = '';
    switch (fileType) {
        case 'mp4':
            type = 'Video';
            break;
        case 'pdf':
            type = 'PDF';
            break;
        case 'png':
            type = 'Imagne';
            break;
        default:
            type = fileType;
            break;
    }

    return type;
}