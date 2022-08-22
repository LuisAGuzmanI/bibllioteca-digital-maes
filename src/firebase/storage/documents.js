import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from '../../main';

import { v4 as uuidv4 } from 'uuid'

export const uploadFile = async (file) => {

    const storageRef = ref(storage, `${file.name}-${uuidv4()}`);

    await uploadBytes(storageRef, file).then((snapshot) => {
        console.log('Uploaded a blob or file!', snapshot);
    });

    return storageRef.toString();
}

export const getFileUrl = async (storageURI) => {

    let fileUrl;
    const fileRef = ref(storage, storageURI);

    await getDownloadURL(fileRef)
        .then((url) => {
            fileUrl = url;
        })
        .catch((error) => {
            // Handle any errors
            console.error(error);
        });

    return fileUrl;

}