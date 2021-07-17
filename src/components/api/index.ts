import { storage, db, auth, firebase, bannersCollection } from "../firebase";

export async function saveEventBanner(event_uid: string, files: FileList) {
  if (files.length > 0)
    for (let i = 0; i < files.length; i++) {
      const eventRef = storage.child(
        `banners/${event_uid}/${auth.currentUser.uid}/${files[i].name}`
      );
      let fileExists;
      let doc;
      try {
        fileExists = await eventRef.getDownloadURL();
      } catch {}
      // if file exists gets its RTDB value for update
      if (fileExists !== undefined) {
        await bannersCollection
          .child(`banners/${event_uid}/${auth.currentUser.uid}`)
          .on("value", (snapshot: any) => {
            doc = snapshot.val();
          });
      }

      const snapshot = await eventRef.put(files[i]);
      if (snapshot != null && snapshot.state == "success") {
        const fileUrl = await eventRef.getDownloadURL();
        let bannerData;

        if (fileExists == undefined) {
          const newDocumentKey = await bannersCollection
            .child(`banners/${event_uid}/${auth.currentUser.uid}`)
            .push().key;
          bannerData = {
            name: files[i].name,
            uid: newDocumentKey,
            modified_at: Date.now(),
            created_by: auth.currentUser.uid,
            url: fileUrl,
            revisions: [fileUrl],
          };
          const updates: any = {};
          updates[
            `banners/${event_uid}/${auth.currentUser.uid}/${newDocumentKey}`
          ] = bannerData;
          bannersCollection.update(updates);
        } else {
          const docRef = bannersCollection.child(
            `banners/${event_uid}/${auth.currentUser.uid}`
          );
          docRef.once("value", (snapshot: any) => {
            snapshot.forEach((childSnapshot: any) => {
              const childKey = childSnapshot.key;
              const childData = childSnapshot.val();
              if (childData.name == files[i].name) {
                bannerData = {
                  ...childData,
                  modified_at: Date.now(),
                  url: fileUrl,
                  revisions: [fileUrl, ...childData.revisions],
                };
                const updates: any = {};
                updates[
                  `banners/${event_uid}/${auth.currentUser.uid}/${childKey}`
                ] = bannerData;
                bannersCollection.update(updates);
              }
            });
          });
        }
      }
    }
}
