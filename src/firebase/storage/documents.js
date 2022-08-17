import { ref, uploadBytes } from "firebase/storage";
import { storage } from '../../main';

// Crea una id aleatoria para cada archivo que se sube 
import { v4 as uuidv4 } from 'uuid';

export const uploadFile = async (file) => {

    const storageRef = ref(storage, `${file.name}-${uuidv4()}`);

    await uploadBytes(storageRef, file).then((snapshot) => {
        console.log('Uploaded a blob or file!', snapshot);
    });

}

