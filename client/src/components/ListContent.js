import React, { useState, useEffect } from 'react'

export default function MyLists( { onDeleteItem, itemId, name, rating }) {

    function deleteItemHandle() {
        onDeleteItem(itemId);
    }

    return (
        <li>
            {name} - {rating} - <button onClick={deleteItemHandle}>Delete Item</button>
        </li>
    );
}