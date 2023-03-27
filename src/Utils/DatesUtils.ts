export class DatesUtils{
    async moreThanTwoHoursDifference(date1:number, date2:number) {
        let difference = Math.abs(date1 - date2);
        let differenceInHours = difference / (1000 * 60 * 60);
        return differenceInHours > 2;
    }

    async CreateFormat_AAAAMMDD(date:Date):Promise<string> {
        let year = date.getFullYear();
        let month = ((date.getMonth() + 1 ) < 10)? `0${date.getMonth() + 1}`: date.getMonth() + 1 ;
        let day = ((date.getDate() + 1 ) < 10)? `0${date.getDate() + 1}`: date.getDate() + 1 ;
        return `${year}-${month}-${day}`;
    }
}