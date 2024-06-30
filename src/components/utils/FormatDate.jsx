import React from 'react'

function FormatDate({isoDate}) {
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0'); // Les mois commencent à 0
        const year = date.getFullYear();
        
        return `${day}/${month}/${year}`;
      };
    
      return (
        <div>
          {formatDate(isoDate)}
        </div>
      );
}

export default FormatDate