import React, { useCallback, useContext } from 'react';
import { useDropzone } from 'react-dropzone';
import appContext from '../context/app/appContext';

const Dropzone = () => {
  
  // connect to state
  const AppContext = useContext(appContext);
  const { showAlert, uploadFile, loading, createLink } = AppContext;



  const onDropAccepted = useCallback( async ( acceptedFiles ) => {
    
    // create form data
    const formData = new FormData();
    formData.append('file', acceptedFiles[0]);
    uploadFile(formData, acceptedFiles[0].path);

  }, []);


  const onDropRejected = () => {
    showAlert('No se pudo subir, el límite de tamaño es 1 MB. Regístrate para subir archivos más grandes');
  }





  // Get content from 
  const { getRootProps, getInputProps, isDragActive, acceptedFiles  } = useDropzone( {onDropAccepted, onDropRejected, maxSize: 1000000} );



  const files = acceptedFiles.map( file => (
    <li key={file.lastModified} className="bg-white flex-1 p-3 mb-4 shadow-lg rouded">
      <p className="font-bold text-xl">{file.path}</p>
      <p className="text-sm text-grey-500">{ (file.size / Math.pow(1024, 2)).toFixed() } MB</p>
    </li>
  ));


  return (
    <div className="md:flex-1 mb-3 mx-2 mt-16 lg:mt-0 flex flex-col items-center justify-center border-dashed border-gray-400 border-4 bg-gray-100 px-4">
      { acceptedFiles.length > 0 ? (
        
        <div className="mt-10 w-full">
          <h4 className="text-2xl font-bold text-center mb-4">Archivos</h4>
          <ul>
            {files}
          </ul>

          { loading ? <p className="my-10 text-center text-gray-500 text-bold">Subiendo archivo </p> : 
          
          <button 
            className="bg-blue-700 w-full py-3 rounded-lg text-white my-10 hover:bg-blue-800"
            type="button"
            onClick={ () => createLink() }
            >
            Crear enlace
          </button>
          }
          
        </div>
        ) : (

          <div { ...getRootProps({ className: 'dropzone w-full py-32' }) } >
          <input className="h-100" { ...getInputProps()  }  />
            {
              isDragActive ? 
                <p className="text-2xl text-center text-gray-600">Soltar archivo</p> 
                : (
                <div className="text-center">
                  <p className="text-2xl text-center text-gray-600">Selecciona un archivo o arrástralo aquí</p>
                  <button className="bg-blue-700 w-full py-3 rounded-lg text-white my-10 hover:bg-blue-800" type="button">Selecciona archivos para subir</button>
                </div>
              )
            }
        </div>
        )
      }
    </div>

  );
}
 
export default Dropzone;