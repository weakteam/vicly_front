import React, {useLayoutEffect, useMemo, useState} from "react";
import AttachmentShowMedia from "./ChatCommon/AttachmentShowMedia";


const maxWidth = 500;

function chunkination(arr, chunksize) {
    if (chunksize < 2)
        chunksize = 2;
    var i, j, temparray, result = [];
    for (i = 0, j = arr.length; i < j; i += chunksize) {
        temparray = arr.slice(i, i + chunksize);
        result.push(temparray);
    }
    return result;
}

function calculateSizes(arr, chunksize) {
    let result = [];
    let i = 0;
    for (let chunk of arr) {
        let sum = chunk.map(elem => elem.width).reduce((prevItem, nextItem) => prevItem + nextItem);
        let height = null, width = null, elements = null;
        if (chunk.length === 1) {
            let element = chunk[0];
            if (element.aspect <= 1) {
                width = maxWidth / 2;
                height = width / element.aspect;
            } else {
                width = maxWidth;
                height = width / element.aspect;
            }
        } else {
            width = maxWidth;
            height = Math.min(...chunk.map(elem => (elem.width / sum) * elem.height));
        }
        result.push({
            height: height,
            width: width,
            elements: elements || chunk.map(elem => elem.width / sum * 100)
        });
        i++;
    }
    return result;
}

export default function MediaGallery(props) {
    let {attachments} = props;
    useLayoutEffect(() => {

    }, [attachments]);
    let chunks = useMemo(() => chunkination(attachments, 3), [attachments]);
    let sizes = useMemo(() => calculateSizes(chunks), [chunks]);

    return chunks.map((row, i) => {
        return (
            <ul style={{
                width: sizes[i].width,
                minWidth: 'auto',
                maxWidth: sizes[i].width,
                borderRadius: i === chunks.length - 1 ? '0 0 10px 10px' : null,
                overflow: 'hidden',
                listStyle: "none",
                margin: "0 0 0 0",
                padding: "0 0 0 0",
                height: sizes[i].height,
                clear: "both",
            }}>
                {
                    row.map((attachment, j) => {
                        return (
                            <li style={{
                                position: "relative",
                                float: "left",
                                width: `${sizes[i].elements[j]}%`,
                                height: sizes[i].height,
                                margin: "0 0 0 0",
                                padding: "0 0 0 0",
                            }}>
                                <AttachmentShowMedia attachment={attachment}/>
                            </li>
                        )
                    })
                }
            </ul>
        )
    })
}