import { db } from '../../lib/firebase/firebaseAdmin'

export const getInstance = async (instanceId: string) => {
  
  const instancesRef = db.collection('instances');
  const instance = await instancesRef.doc(instanceId).get();

  if (!instance.exists) {
    return null;
  }

  return instance.data();
};
