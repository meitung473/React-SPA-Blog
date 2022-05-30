import { useEffect, useCallback, useState, useRef } from "react";
import { getComments, linkphaser } from "../WebAPI";

export function useLoadmessage() {
    const [messages, setMessage] = useState(null);
    const [hasMore, setHasMore] = useState(false);
    const [isloading, setisLoading] = useState(false);
    const [startcount, setStartcount] = useState(null);
    const totalmessages = useRef(0);

    let observer = useRef(null);
    const observerref = useCallback(
        (node) => {
            const options = {
                rootMargin: "0px",
                threshold: 0.5,
            };

            if (isloading) return;
            if (observer.current) {
                observer.current.disconnect();
            }
            if (hasMore) {
                observer.current = new IntersectionObserver(
                    (entries, observer) => {
                        if (entries[0].isIntersecting) {
                            setisLoading(true);
                            getComments(startcount, 3)
                                .then((res) => {
                                    setHasMore(
                                        startcount < totalmessages.current
                                    );
                                    return res.json();
                                })
                                .then((data) => {
                                    setMessage((prev) => {
                                        return [...prev, ...data];
                                    });
                                    setStartcount((prev) => prev + 3);
                                    setisLoading(false);
                                });
                        }
                    },
                    options
                );
                if (node !== null) {
                    observer.current.observe(node);
                }
            }
        },
        [startcount, hasMore, isloading]
    );

    useEffect(() => {
        setisLoading(true);
        getComments(0, 5)
            .then((res) => {
                const { total } = linkphaser(res);
                totalmessages.current = total;
                return res.json();
            })
            .then((data) => {
                setMessage([...data]);
                setStartcount(data.length);
                setHasMore(data.length < totalmessages.current);
                setisLoading(false);
            });
    }, []);

    return {
        observerref,
        setMessage,
        messages,
        setStartcount,
        isloading,
    };
}
