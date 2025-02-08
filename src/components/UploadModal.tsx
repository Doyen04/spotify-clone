import Modal from "./Modal";


const UploadModal = () => {
    return(
        <Modal title={"Upload your file"} description={"Upload your file"} isOpen onChange={()=>{}}>
            Upload content
        </Modal>
    )
}

export default UploadModal;