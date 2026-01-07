import { useState, useEffect, useRef, RefObject } from 'react'

export default function useIntersectionObserver(
    options: IntersectionObserverInit = { threshold: 0.1, root: null, rootMargin: '0px'}
):[RefObject<HTMLDivElement>, boolean]{
    const [ isIntersecting, setIntersecting] = useState(false)
    const targetRef= useRef<HTMLDivElement>(null!)

    useEffect(()=>{
        const target = targetRef.current
        if(!target) return
        const observer = new IntersectionObserver((entries)=>{
            const entry = entries[0]
            if(entry){
                setIntersecting(entry.isIntersecting)
            }
        }, options)
        observer.observe(target)
        return()=>{
            observer.unobserve(target)
        }
    },[options])
    return[targetRef, isIntersecting] as const
}