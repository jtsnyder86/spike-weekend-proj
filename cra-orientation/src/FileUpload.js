import React, { useState } from 'react'
// import FileUploaded from './FileUploaded';
import axios from 'axios';

function FileUpload() {

    const [file, setFile] = useState('');
    const [fileName, setFileName] = useState('Choose File');
    const [uploadedFile, setUploadedFile] = useState({});

    const onSubmit = async e => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('file', file);
        // formData.append("file", fileName);

        axios.post('/upload', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
            .then((res) => {
                alert("File Upload success");
                const { fileName, filePath } = res.data;
                setUploadedFile({ fileName, filePath });
            })
            .catch((err) => alert("File Upload Error", err));
    };

    const onChange = (e) => {
        setFile(e.target.files[0]);
        setFileName(e.target.files[0].name)
    }

    return (

        <>
            <form onSubmit={onSubmit}>
                <div>
                    <input
                        type="file"
                        id='customFile'
                        onChange={onChange}
                    />
                    <label htmlFor='customFile'>
                        {fileName}
                    </label>
                </div>
                <input
                    type='submit'
                    value='Upload'
                />
            </form>
            {uploadedFile ? <div>
                <h3>{uploadedFile.fileName}</h3>
                <img style={{width: '100%'}} src={uploadedFile.filePath} />
            </div> : null}
        </>

    )
}

export default FileUpload