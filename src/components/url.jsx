import React from "react";
import { useState } from "react";
import { toast, ToastContainer } from 'react-toastify';
import axios from 'axios';
import ShortenedUrl from "./shortenedUrl";
export default function Url(){
    const [url, setUrl] = useState('');
    const [shortUrl, setShortUrl] = useState('')
    const [copied, setCopied] = useState(false);
    function handleChange(e) {
        setUrl(e.target.value);
    }

    async function handleSubmit(e) {
        e.preventDefault();
    
        if (!url) {
            toast.error('Please enter a URL');
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

    return (
        <div className="url-paste-container">
            <h1 className="heading">Shorten Your Loooong Links</h1>
            <p>Shortly is an efficient and easy-to-use URL shortening service that streamlines your online experience. </p>
            <form onSubmit={handleSubmit} action="">
            <div className="wrapper">
                
                <input onChange={handleChange} className="icon" type="text" placeholder="Enter the link" />
                <button type="submit">
                    Shorten Now!
                </button>
                {shortUrl && <ShortenedUrl url={shortUrl} onCopy={handleCopy} />}

                {copied && <p className="copy-message">URL copied to clipboard!</p>}

            </div>
            </form>
        </div>
    )
}