import { useState } from "react";
import MyUploads from "../components/upload/MyUploads";
import UploadBasic from "../components/upload/UploadBasic";

export default function Upload() {
  const [myUploadsUpdateKey, setMyUploadsUpdateKey] = useState(0);

  return (
    <div className="view-analyze">
      <div className="grid-row-40-60">
        <div className="big-text-full">
          <div className="big-card-text">
            <div className="text-headline">Interview Upload</div>
            <div className="text-card-body">
              <UploadBasic
                email={user.email}
                setMyUploadsUpdateKey={setMyUploadsUpdateKey}
              />
            </div>
          </div>
        </div>
        <div className="bg-img-card">
          <div className="bg-card-text">
            <div className="bg-img-text-inner">
              <div className="text-headline white">Meine Interviews</div>
              <div className="text-card-body white">
                <p>
                  Hier können Text- und Audio-Dateien hochgeladen und verwaltet
                  werden.
                </p>
                <p>
                  Die Applikation unterstützt .txt und verschiedene Audioformate
                  wie mp3, wav, mpeg, webm etc. Audio-Dateien werden automatisch
                  in Text umgewandelt.
                </p>
                <p>
                  In der Dateiverwaltung können die hochgeladenen Dateien
                  bearbeitet oder gelöscht werden.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="grid-row-100">
        <div className="big-text-full">
          <MyUploads
            email={user.email}
            myUploadsUpdateKey={myUploadsUpdateKey}
          />
        </div>
      </div>
    </div>
  );
}
