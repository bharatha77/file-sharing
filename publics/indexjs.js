
const dropContainer=document.querySelector(".drop-zone");
const uploadbtn=document.querySelector(".upload");
const file=document.querySelector(".file");
const bgProgress=document.querySelector(".bg-progress");
const percent=document.querySelector("#percent");
const progresBar=document.querySelector(".progress-bar");
const progressConatiner=document.querySelector(".progress-conatiner");
const linktext=document.querySelector("#linkcopy");
const copybtn=document.querySelector("#copybtn");
const linkContainer=document.querySelector(".link-container");
dropContainer.addEventListener("dragover",(e)=>{
    e.preventDefault()
    if(!dropContainer.classList.contains("dragged")){
        dropContainer.classList.add("dragged");
    }
});
dropContainer.addEventListener("dragleave",()=>{
    dropContainer.classList.remove("dragged")
});
dropContainer.addEventListener("drop",(e)=>{
    e.preventDefault();
    const infiles=e.dataTransfer.files;
    if(infiles.length){
        file.files=infiles;
        upload()
    }
    dropContainer.classList.remove("dragged")
});
uploadbtn.addEventListener("click",()=>{
    file.click();
});
file.addEventListener("change",()=>{
    upload()
})

const upload=()=>{
    const filetotalsize=1024*1024*1000
    progressConatiner.style.display="block"
    const fileitem=file.files[0];
    if(fileitem.size>filetotalsize){
        fileitem.value="";
        return
    }
    if(!fileitem){
        return
    }
    const formdata=new FormData();
    formdata.append("file",fileitem);
    const xhr=new XMLHttpRequest();
    xhr.onreadystatechange = () => {
        if (xhr.readyState === 4) {
            if (xhr.status === 200) {
                console.log("File uploaded successfully!",xhr.response);
                showlink(JSON.parse(xhr.response));
            } else {
                console.log("Error uploading file.");
            }
        }
    };
    xhr.upload.onprogress=updateprogess;
    xhr.open("POSt","/file/upload");
    xhr.send(formdata)
}

function updateprogess(e){
    const precentage=Math.round((e.loaded/e.total)*100);
    bgProgress.style.width=`${precentage}%`
    percent.innerText=`${precentage}%`
    progresBar.style.transform=`scaleX(${precentage/100})`;
}
function showlink({file}){
    linkContainer.style.display="block";
    console.log("file",file)
    linktext.value=file;
    copybtn.addEventListener("click",()=>{
        linktext.select();
        linktext.setSelectionRange(0, 99999);
         navigator.clipboard.writeText(linktext.value);
    })
    progressConatiner.style.display="none";
}

 