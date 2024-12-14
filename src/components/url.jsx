import React from "react";
import { useState } from "react";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import ShortenedUrl from "./shortenedUrl";
import UrlHistory from "./urlHistory";
export default function Url(){
    const [url, setUrl] = useState('')
    const [shortUrl, setShortUrl] = useState('')
    const [copied, setCopied] = useState(false)
    const [urlHistory, setUrlHistory] = useState([])
    function handleChange(e) {
        setUrl(e.target.value)
    }

    async function handleSubmit(e) {
        e.preventDefault()
    
        if (!url) {
            toast.error('Please enter a URL')
            return;
        }
        const accessToken = "f05b4228821a79783b10c605aa6007bb6fa574b1"
        const apiUrl = 'https://api-ssl.bitly.com/v4/shorten';

        const formattedUrl = /^(https?|ftp):\/\//i.test(url) ? url : `http://${url}`;

        try {
          const response = await axios.post(
            apiUrl,
            { long_url: formattedUrl },
            {
              headers: {
                Authorization: `Bearer ${accessToken}`,
                'Content-Type': 'application/json',
              },
            }
          );

          const shortenedUrl = response.data.link;
          
          setShortUrl(shortenedUrl)
          
          console.log(shortUrl+" "+url)
          
          function formatDate(currentDate){
            const day = String(currentDate.getDate()).padStart(2, '0');
            const month = String(currentDate.getMonth() + 1).padStart(2, '0');
            const year = currentDate.getFullYear();
            let hours = currentDate.getHours();
            const minutes = String(currentDate.getMinutes()).padStart(2, '0');
            const seconds = String(currentDate.getSeconds()).padStart(2, '0');
            const amPm = hours >= 12 ? 'PM' : 'AM';
            hours = hours % 12 || 12; 

            const formattedDateTime = `${day}/${month}/${year} ${String(hours).padStart(2, '0')}:${minutes}:${seconds} ${amPm}`;
            return formattedDateTime
          }
          const currentDate = new Date();
          const newObj = {
            original:url,
            shortened:shortenedUrl,
            date: formatDate(currentDate)
          }
          const updatedHistory = [newObj, ...urlHistory]
          setUrlHistory(updatedHistory)
          
          
    }catch (error) {
        console.error(error);
      }
    }

    function handleCopy ()  {
        setCopied(true);
        setTimeout(() => {
          setCopied(false);
        }, 3000);
      };
      console.log(urlHistory)
    return (
        <div className="url-paste-container">
          <ToastContainer position="top-right"/>
            <h1 className="heading">Shorten Your Loooong Links</h1>
            <p>Shortly is an efficient and easy-to-use URL shortening service that streamlines your online experience. </p>
            <form onSubmit={handleSubmit} action="">
            <div className="wrapper">
                
                <input onChange={handleChange} className="icon" type="text" placeholder="Enter the link" />
                <button type="submit">
                    Shorten Now!
                </button>
                

            </div>
            </form>
            {shortUrl && <ShortenedUrl url={shortUrl} onCopy={handleCopy} />}
            {copied && <p className="copy-message">URL copied to clipboard!</p>}
            {/* {true && <UrlHistory urlHistory={urlHistory}/>} */}
        </div>
    )
}