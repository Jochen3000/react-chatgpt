// import { useAuth0 } from "@auth0/auth0-react";
import { useState } from "react";
import MyUploadsVector from "../components/upload/MyUploadsVector";
import UploadVector from "../components/upload/UploadVector";
import "../assets/css/dashboard.css";
// import LoginButton from "../components/LoginButton";

export default function Manage() {
  const [myUploadsUpdateKey, setMyUploadsUpdateKey] = useState(0);
  // const { user, isAuthenticated, isLoading } = useAuth0();
  const [documents, setDocuments] = useState([]);
  const isDocumentIdDuplicate = (documentId) => {
    return documents.some((document) => document.id === documentId);
  };

  const databaseName = "podojo_metadata";
  const collectionName = "doku";

  // if (!isAuthenticated) {
  //   return (
  //     <div className="login-message">
  //       <p>Zur Nutzung der Funktionen bitte anmelden.</p>
  //       <LoginButton />
  //     </div>
  //   );
  // }
  return (
    <div className="view-analyze">
      <div className="grid-row-100">
        <div className="big-text-full">
          <div className="big-card-text">
            <div className="text-headline">Index verwalten</div>
            <div className="text-card-body">
              <UploadVector
                databaseName={databaseName}
                collectionName={collectionName}
                email="info@podojo.com"
                setMyUploadsUpdateKey={setMyUploadsUpdateKey}
                isDocumentIdDuplicate={isDocumentIdDuplicate}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="grid-row-100">
        <div className="big-text-full">
          <MyUploadsVector
            myUploadsUpdateKey={myUploadsUpdateKey}
            databaseName={databaseName}
            collectionName={collectionName}
            documents={documents}
            setDocuments={setDocuments}
          />
        </div>
      </div>
    </div>
  );
}
