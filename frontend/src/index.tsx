import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import axios from 'axios'
import fileDownload from 'js-file-download'

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import CardActionArea from '@mui/material/CardActionArea';
import FolderIcon from '@mui/icons-material/Folder'
import ArticleIcon from '@mui/icons-material/Article'
import ImageIcon from '@mui/icons-material/Image';
import TurnLeftIcon from '@mui/icons-material/TurnLeft';
import Button from '@mui/material/Button'
import Input from '@mui/material/Input'
import Modal from '@mui/material/Modal'

/* CONSTANTS */
const currentpath = ""
const base_url = "http://192.168.0.71:3000/"
const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

/* COMPONENTS */
function FolderCard(props: {
                      foldername: string,
                      isfather: boolean,
                      path: string,
                      setpath: Function }
                   )
{
  let name = <Typography sx={{ ml: 2 }}>{props.foldername}</Typography>
  let icon = <FolderIcon/>
  let folderpath = props.path + props.isfather ? '' : props.foldername

  function jump_to_folder() {
    if(props.isfather) {
      axios.get(base_url + 'parent/' + props.path + props.foldername)
      .then((res) => {
        if(props.path !== "") {
          props.setpath(res.data)
        }
      })
      .catch((err) => console.error(err))
    } else {
      axios.get(base_url + 'get/' + folderpath)
      .then((_res) => {
        if(props.path === "") {
          props.setpath(props.foldername)
        } else {
          props.setpath(props.path + '+' + props.foldername)
        }
      })
      .catch((err) => console.error(err))
    }
  }

  if(props.isfather) {
      icon = <TurnLeftIcon/>
      name = <Typography sx={{ ml: 2 }}>Go to parent folder</Typography>
  }

  return(
      <Card sx={{ bgcolor: 'secondary.main', color: 'secondary.constrastText' }}>
        <CardActionArea onClick={jump_to_folder}>
          <CardContent sx={{ display: 'flex' }}>
            {icon}
            {name}
          </CardContent>
        </CardActionArea>
      </Card>
  )
}

function FileCard(props: { filename: string, path: string }) {
  let icon
  let iconextensions = ['png', 'jpg', 'svg']
  let filepath = props.path + props.filename

  if(props.path !== "")
    filepath = props.path + '+' + props.filename

  function download_file() {
    console.log(base_url + 'get/' + filepath)
    axios.get(base_url + 'get/' + filepath)
    .then((res) => {
      fileDownload(res.data, props.filename)
    })
    .catch((err) => console.log(err))
  }

  if(iconextensions.indexOf(props.filename.split('.').pop()!) > -1) {
    icon = <ImageIcon/>
  } else {
    icon = <ArticleIcon/>
  }

  return(
      <Card sx={{ bgcolor: 'primary.main', color: 'primary.constrastText' }}>
        <CardActionArea onClick={download_file}>
          <CardContent sx={{ display: 'flex' }}>
            {icon}
            <Typography sx={{ ml: 2 }}>{props.filename}</Typography>
          </CardContent>
        </CardActionArea>
      </Card>
  )
}

function UploadFilesCard(props: { path: string }) {
  const [files, setfiles] = useState<FileList>()

  function onchange(event: React.ChangeEvent<HTMLInputElement>) {
    if(event.target.files)
      setfiles(event.target.files)
  }

  function onsubmit(_event: React.FormEvent) {
    if(files) {
      let realpath = props.path
      if(props.path !== "") {
        realpath = props.path + '+'
      }


      for(let i = 0; i < files.length; i++) {
        const formdata = new FormData()
        formdata.append('fileinput', files[i])
        axios.post(base_url + 'post/' + realpath + files[i].name + '/f', formdata)
        .then(res => console.log(res))
        .catch(err => console.log(err))
      }
    }
  }

  return(
    <Card sx={{ bgcolor: 'green', color: 'white'}}>
      <CardContent>
        <form onSubmit={onsubmit}>
          <input type="file" name="fileinput" multiple onChange={onchange}/>
          <input type="submit" value="UPLOAD"/>
        </form>
      </CardContent>
    </Card>
  )
}

function MakeDirCard(props: { path: string }) {
  const [name, setname] = useState("")

  function onchange(event: React.ChangeEvent<HTMLInputElement>) {
    setname(event.target.value)
  }
  function onsubmit(_event: React.FormEvent) {
    if(name !== "") {
      let realpath = props.path
      if(props.path !== "")
        realpath = props.path + '+'

      axios.post(base_url + 'post/' + realpath + name + '/d')
      .then(null)
      .catch(err => console.error(err))
    }
  }

  return(
    <Card sx={{ bgcolor: 'green', color: 'white'}}>
      <CardContent>
        <form onSubmit={onsubmit}>
          <input type="text" onChange={onchange}/>
          <input type="submit" value="CREATE DIR"/>
        </form>
      </CardContent>
    </Card>
  )
}

function FileList() {
  const [data, setdata] = useState({folders: [], files: []})
  const [path, setpath] = useState(currentpath)

  axios.get(base_url + 'get/' + path)
  .then((res) => {
    setdata(res.data)
  })
  .catch((err) => { console.log(err) })


  // if (!data) return "NO DATA"

  return(
  <Stack spacing={2}>
      <UploadFilesCard path={path}/>
      <MakeDirCard path={path}/>
      {
        path === "" ?
        <div/> :
        <FolderCard path={path} setpath={setpath} isfather={true} foldername={''}/>
      }
      {data.folders.map(name => (
        <FolderCard path={path} setpath={setpath} isfather={false} foldername={name}/>
      ))}
      {data.files.map(name => (
        <FileCard path={path} filename={name}/>
      ))}
  </Stack>
  )
}

/* RENDER */
root.render(
    <FileList/>
)
