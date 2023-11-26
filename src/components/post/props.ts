export interface PostProps {
    like?:number;
    dislike?:number;
    author:number;
    publishDate:string
    favorite?:number;
    share?:number;
    comment?:number;
    title:string;
    content:string;
    operated?:{
        like:boolean;
        dislike:boolean;
        favorite:boolean;
        comment:boolean;
    }
}