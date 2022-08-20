import { ref, uploadBytes } from "firebase/storage";
import { storage } from '../../main';

export const uploadFile = async (file, docRefId) => {

    const storageRef = ref(storage, `${file.name}-${docRefId}`);

    await uploadBytes(storageRef, file).then((snapshot) => {
        console.log('Uploaded a blob or file!', snapshot);
    });

}

