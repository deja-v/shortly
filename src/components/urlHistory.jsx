import React from "react";

export default function UrlHistory({history}){
    
    
    return (
        <div className="url-history">
      <h2>URL History</h2>
      <table>
        <thead>
          <tr>
            <th>Original URL</th>
            <th>Shortened URL</th>
            <th>Created At</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {history.map(({ originalUrl, shortUrl, createdAt }, index) => (
            <tr key={index}>
              <td>{originalUrl}</td>
              <td>{shortUrl}</td>
              <td>{formatDate(createdAt)}</td>
              <td>
                <button onClick={() => copyToClipboard(shortUrl)}>Copy</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <ToastContainer />
    </div>
    )
}