export class DateFormatter {
    private static months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    private static shortMonths = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

    public static formatDate(date: Date, useShortMonths?: boolean, excludeYear?: boolean): string {
        let formattedDate: string = "";        
        let month = useShortMonths? DateFormatter.shortMonths[date.getMonth()] : DateFormatter.months[date.getMonth()];
        let day = date.getDate();
        let year = date.getFullYear();
        if (excludeYear == true) {
            formattedDate = month + " " + day;
        }
        else {
            formattedDate = month + " " + day + ", " + year;    
        }
        return formattedDate;
    }
}