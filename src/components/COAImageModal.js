import React, { useEffect, useState } from 'react'
import Modal from 'react-bootstrap/Modal'
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
// import { Document, Page, pdfjs } from 'react-pdf';

// pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

import { Viewer } from '@react-pdf-viewer/core'; // install this library
// Plugins
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout'; // install this library
// Import the styles
import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';
// Worker
import { Worker } from '@react-pdf-viewer/core'; // install this library

const COAImageModal = (props) => {

    // Create new plugin instance
    const defaultLayoutPluginInstance = defaultLayoutPlugin();

    const proxyurl = "https://cors-anywhere.herokuapp.com/";

    const [pageNumber, setPageNumber] = useState(1);
    const [numPages, setNumPages] = useState(null);

    useEffect(() => {
        console.log("props+++++", props.coaFileType)
    }, [])

    function onDocumentLoadSuccess({ numPages }) {
        setNumPages(numPages);
    }

    return (
        <div className="scoped-bootstrap">
            {props.coaFileType !== "application/pdf" ?
                <Modal
                    {...props}
                    backdropClassName="scoped-bootstrap"
                    // size="lg"
                    // aria-labelledby="contained-modal-title-vcenter"
                    dialogClassName="modal-40w"
                    centered
                >
                    <Modal.Header closeButton></Modal.Header>
                    <Modal.Body>
                        <div className="modal-message">
                            <div className="modal-message-cont">
                                <h1 style={{ alignSelf: 'center', textAlign: 'center' }}>Certificate of Analysis</h1>
                                <div className="zooImageArea">
                                    <TransformWrapper>
                                        <TransformComponent>
                                            <img src={props.coaImage} alt="COA" className="coaImage" />
                                        </TransformComponent>
                                    </TransformWrapper>
                                </div>
                                {/* <img src={props.coaImage} alt="COA" className="coaImage" /> */}
                            </div>
                        </div>
                    </Modal.Body>
                </Modal> :
                <Modal
                    {...props}
                    backdropClassName="scoped-bootstrap"
                    size="xl"
                    // aria-labelledby="contained-modal-title-vcenter"
                    dialogClassName="modal-120w"
                    centered
                >
                    <Modal.Header closeButton></Modal.Header>
                    <Modal.Body>
                        <div className="modal-message">
                            <div className="modal-message-cont">
                                <h1 style={{ alignSelf: 'center' }}>COA</h1>
                                <Worker workerUrl="https://unpkg.com/pdfjs-dist@2.6.347/build/pdf.worker.min.js">
                                    <Viewer fileUrl={props.coaImage}
                                        plugins={[defaultLayoutPluginInstance]} />
                                </Worker>
                            </div>
                        </div>
                    </Modal.Body>
                </Modal>
            }
        </div>
    )
}
export default COAImageModal;