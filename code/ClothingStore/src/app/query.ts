export class Query {
    fullName:string;
    email:string;
    queryType:string;
    queryContent:string;
    constructor(fullName, email, queryType, queryContent){
        this.fullName = fullName;
        this.email = email;
        this.queryType = queryType;
        this.queryContent = queryContent;
    }
}
