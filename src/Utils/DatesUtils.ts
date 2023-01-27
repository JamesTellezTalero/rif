export class DatesUtils{
    async moreThanTwoHoursDifference(date1:number, date2:number) {
        let difference = Math.abs(date1 - date2);
        let differenceInHours = difference / (1000 * 60 * 60);
        return differenceInHours > 2;
    }
}