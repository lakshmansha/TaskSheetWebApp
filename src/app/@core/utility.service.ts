export class UtilityService {
  //#region Date Util

  getDateFrmJSON_T(jsonDate: string) {
    let fulldate: Date;
    if (jsonDate !== '') {
      fulldate = new Date(jsonDate);
    }
    return fulldate;
  }

  IsDate(value: any) {
    let valid = false;

    if (value && Object.prototype.toString.call(value) === '[object Date]' && !isNaN(value)) {
      valid = true;
    }

    return valid;
  }

  // Get Date on Multi Format.
  getDateString(dt: any, Format: string) {
    let values = new Date();
    if (this.IsDate(dt)) {
      values = dt;
    }
    const day = values.getDate();
    const Month = values.getMonth() + 1;
    const year = values.getFullYear();

    let SDate = '';
    if (Format === '-') {
      SDate = this.RoundNum(day) + '-' + this.RoundNum(Month) + '-' + year;
    }
    if (Format === 'name') {
      SDate = this.RoundNum(day) + '' + this.RoundNum(Month) + '' + year;
    } else if (Format === 'sht_name') {
      const strYear = year.toString().substring(2);
      SDate = this.RoundNum(day) + '' + this.RoundNum(Month) + '' + strYear;
    } else {
      SDate = this.RoundNum(day) + '/' + this.RoundNum(Month) + '/' + year;
    }
    return SDate;
  }

  RoundNum(value: number) {
    let val = '';
    if (value < 10) {
      val = '0' + value;
    } else {
      val = value.toString();
    }
    return val;
  }

  //#endregion
}
