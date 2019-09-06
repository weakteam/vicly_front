import React, {useCallback, useRef} from "react";
import '../../css/IOS.css'
import '../../css/scrollbar.css'
import {ResizeObserver} from "@juggle/resize-observer";


const MyScrollContainer = (scrollCallback, resizeObserver) =>
    function ScrollContainer({
                                 className,
                                 style,
                                 reportScrollTop,
                                 scrollTo,
                                 children,
                             }) {
        const elRef = useRef(null);

        const onScroll = useCallback((e) => {
            // scrollT.current = e.target.scrollTop;
            scrollCallback(e);
            reportScrollTop(e.target.scrollTop);
        }, []);

        const ref = useCallback((theRef) => {
            if (theRef) {
                theRef.addEventListener('scroll', onScroll, {passive: true});
                elRef.current = theRef;
                const ro = new ResizeObserver(resizeObserver);
                ro.observe(elRef.current);
                return () => ro.disconnect();
            } else {
                elRef.current.removeEventListener('scroll', onScroll);
            }
        }, [])

        scrollTo(scrollTop => {
            const goTo = {top: scrollTop};
            elRef.current.scrollTo(goTo);
        })

        return (
            <div ref={ref} style={{
                ...style,
                overflowY: 'auto',
                WebkitOverflowScrolling: 'touch',
                position: 'relative',
                outline: 'none'
            }} tabIndex={0} className={className + " scrollbarMessages"} id="style-2">
                {children}
            </div>
        )
    };


export default MyScrollContainer