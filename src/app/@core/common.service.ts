import { environment } from '@env/environment';
import { Observable } from 'rxjs';
import { NgbDateStruct, NgbTimeStruct } from '@ng-bootstrap/ng-bootstrap';

declare let DocumentTouch: any;
const configDataKey = 'configData';

export class Common {
  CurrntMonth = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  DateKey = ['createdAt', 'reportedAt', 'updatedAt'];

  private _configContext: any | null;
  private _defPOClaims: any[] = [];
  private _POClaims: any[] = [];

  constructor(private source?: string) {
    const savedConfigData = sessionStorage.getItem(configDataKey);
    if (savedConfigData) {
      this._configContext = JSON.parse(savedConfigData);
    }

    if (!String.prototype.includes) {
      String.prototype.includes = function (search: string, start: number) {
        if (typeof start !== 'number') {
          start = 0;
        }

        if (start + search.length > this.length) {
          return false;
        } else {
          return this.indexOf(search, start) !== -1;
        }
      };
    }
  }

  replaceAll(txt: string, replace: string, with_this: string) {
    return txt.replace(new RegExp(replace, 'g'), with_this);
  }

  FormatName(name: string) {
    let rtn = '';
    if (name.includes('/')) {
      rtn = name.split('/')[1];
    } else if (name.includes(':')) {
      rtn = name.split(':')[1];
    } else if (name.includes('\\')) {
      rtn = name.split('\\')[1];
    } else {
      rtn = name;
    }
    return rtn;
  }

  IsValid(value: any) {
    let valid = false;

    if (typeof value === 'string') {
      if (value !== null && value !== undefined && value !== '' && value !== 'null') {
        valid = true;
      }
    } else if (typeof value === 'number') {
      if (value !== null && value !== undefined && value > 0) {
        valid = true;
      }
    } else if (typeof value === 'object') {
      if (value === null || value === undefined) {
        valid = false;
      } else {
        if (Object.keys(value).length > 0) {
          valid = true;
        }
      }
    }

    return valid;
  }

  IsCoordsValid(value: any) {
    let valid = false;

    if (typeof value === 'number') {
      if (value !== null && value !== undefined) {
        valid = true;
      }
    }

    return valid;
  }

  IsBoolValid(value: any) {
    let valid = false;

    if (value !== null && value !== undefined) {
      valid = true;
    }

    return valid;
  }

  IsInvalid(value: any) {
    let valid = true;

    if (typeof value === 'string') {
      if (value !== null && value !== undefined && value !== '') {
        valid = false;
      }
    }

    if (typeof value === 'number') {
      if (value !== null && value !== undefined && value > 0) {
        valid = false;
      }
    }

    return valid;
  }

  IsNumInvalid(value: any) {
    let valid = true;

    if (typeof value === 'string') {
      if (value !== null && value !== undefined && value !== '0' && value !== '') {
        valid = false;
      }
    }

    if (typeof value === 'number') {
      if (value !== null && value !== undefined && value > 0) {
        valid = false;
      }
    }

    return valid;
  }

  IsArrayValid(value: any) {
    let valid = false;

    if (value.length > 0) {
      valid = true;
    }

    return valid;
  }

  IsDefined(value: any) {
    let valid = false;

    if (value !== null && value !== undefined) {
      valid = true;
    }

    return valid;
  }

  isDefined(value: any) {
    let valid = false;

    if (value !== undefined) {
      valid = true;
    }

    return valid;
  }

  IsDateValid(value: NgbDateStruct) {
    let valid = false;

    if (this.IsValid(value.day) && this.IsValid(value.month) && this.IsValid(value.year)) {
      valid = true;
    }

    return valid;
  }

  IsDate(value: any) {
    let valid = false;

    if (value && Object.prototype.toString.call(value) === '[object Date]' && !isNaN(value)) {
      valid = true;
    }

    return valid;
  }

  IsValueExistByObj(Lst: any, Obj: any, column: string) {
    let isExist = true;
    if (this.IsArrayValid(Lst)) {
      const Object = Lst.filter(function (obj: any) {
        return obj[column] === Obj[column];
      });

      if (this.IsArrayValid(Object)) {
        isExist = false;
      }
    }

    return isExist;
  }

  IsValueExist(Lst: any, column: string) {
    let isExist = false;
    if (this.IsArrayValid(Lst)) {
      const Object = Lst.filter((obj: any) => {
        const isval = this.IsValid(obj[column]);
        return isval;
      });

      if (this.IsArrayValid(Object)) {
        isExist = true;
      }
    }

    return isExist;
  }

  MoveItemOnArray(Lst: any, current_index: number, new_index: number) {
    if (this.IsArrayValid(Lst) && current_index !== new_index) {
      while (current_index < 0) {
        current_index += Lst.length;
      }
      while (new_index < 0) {
        new_index += Lst.length;
      }
      if (new_index >= Lst.length) {
        let k = new_index - Lst.length;
        while (k-- + 1) {
          Lst.push(undefined);
        }
      }

      Lst.splice(new_index, 0, Lst.splice(current_index, 1)[0]);
    }

    return Lst;
  }
  GetNameFromList(List: any, ColName: string) {
    let Name = '';

    if (List.length > 0) {
      List.forEach((element: any, index: any) => {
        Name += element[ColName];
        Name += index === List.length - 1 ? '.' : ',';
      });
    }

    return Name;
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
    } else if (Format === 'spec') {
      SDate = day + ' ' + this.CurrntMonth[Month - 1].substring(0, 3) + ' ' + year;
    } else if (Format === 'name') {
      SDate = this.RoundNum(day) + '' + this.RoundNum(Month) + '' + year;
    } else if (Format === 'sht_name') {
      const strYear = year.toString().substring(2);
      SDate = this.RoundNum(day) + '' + this.RoundNum(Month) + '' + strYear;
    } else {
      SDate = this.RoundNum(day) + '/' + this.RoundNum(Month) + '/' + year;
    }
    return SDate;
  }

  // Get Time on Format'hh-mm tt'.
  getTimeString(dt: any, Format?: string) {
    let values = new Date();
    if (this.IsDate(dt)) {
      values = dt;
    }
    let hours = values.getHours();
    const minutes = values.getMinutes();
    const seconds = values.getSeconds();
    let suffix = 'AM';
    if (hours >= 12) {
      suffix = 'PM';
      hours = hours - 12;
    }
    if (hours === 0) {
      hours = 12;
    }
    let Stime = '';
    if (this.IsInvalid(Format)) {
      Stime = this.RoundNum(hours) + ':' + this.RoundNum(minutes) + ' ' + suffix;
    } else if (Format === 'name') {
      Stime = this.RoundNum(hours) + '' + this.RoundNum(minutes) + '' + this.RoundNum(seconds);
    }

    return Stime;
  }

  get24TimeString(dt: any, Format?: string) {
    let values = new Date();
    if (this.IsDate(dt)) {
      values = dt;
    }
    const hours = values.getHours();
    const minutes = values.getMinutes();
    const seconds = values.getSeconds();

    let Stime = '';
    if (this.IsInvalid(Format)) {
      Stime = this.RoundNum(hours) + ':' + this.RoundNum(minutes) + '' + this.RoundNum(seconds);
    } else if (Format === 'name') {
      Stime = this.RoundNum(hours) + '' + this.RoundNum(minutes) + '' + this.RoundNum(seconds);
    }

    return Stime;
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

  getJSONDate(): any {
    const dt = new Date();
    const newDate = new Date(
      Date.UTC(
        dt.getFullYear(),
        dt.getMonth(),
        dt.getDate(),
        dt.getHours(),
        dt.getMinutes(),
        dt.getSeconds(),
        dt.getMilliseconds()
      )
    );
    const JSONDate = '/Date(' + newDate.getTime() + ')/';
    return JSONDate;
  }

  getJSONDateFrmDate(dt: any) {
    if (!this.IsDate(dt)) {
      const isT = this.Split(dt, 'T');
      if (this.IsArrayValid(isT) && isT.length > 1) {
        dt = this.getDateFrmJSON_T(dt);
      }
    }
    const newDate = new Date(
      Date.UTC(
        dt.getFullYear(),
        dt.getMonth(),
        dt.getDate(),
        dt.getHours(),
        dt.getMinutes(),
        dt.getSeconds(),
        dt.getMilliseconds()
      )
    );
    const JSONDate = '/Date(' + newDate.getTime() + ')/';
    return JSONDate;
  }

  // Convert Json Date to Date for Format /Date(1654546545464)/
  getDateFrmJSON(jsonDate: string) {
    let fulldate: Date;
    if (jsonDate !== '') {
      const regex = /-?\d+/;
      const matches = regex.exec(jsonDate);
      fulldate = new Date(parseInt(matches[0], null));
    }
    return fulldate;
  }

  // Convert Json Date to Date for Format 20140313T00:00:00
  getDateFrmJSON_T(jsonDate: string) {
    let fulldate: Date;
    if (jsonDate !== '') {
      fulldate = new Date(jsonDate);
    }
    return fulldate;
  }

  CreateDate(dt?: any) {
    if (!this.IsDate(dt)) {
      dt = new Date();
    }

    const newDate = new Date(dt.getFullYear(), dt.getMonth(), dt.getDate());
    return newDate;
  }

  ToBoolean(value: string): boolean {
    let val: boolean;
    if (typeof value === 'string') {
      if (value.toLowerCase() === 'true') {
        val = true;
      } else {
        val = false;
      }
    } else {
      val = value;
    }

    return val;
  }

  ToNumeric(value: string): number {
    let val: number;
    val = parseInt(value, 0);
    return val;
  }

  Split(name: string, Format: string) {
    let rtn: any;
    if (this.IsValid(name)) {
      if (name.includes(Format)) {
        rtn = name.split(Format);
      }
    } else {
      rtn = [];
    }

    return rtn;
  }

  IsDateCol(key: string) {
    return this.DateKey.filter((obj) => obj === key).length > 0;
  }

  //#region Configuration Variables

  SetConfig() {
    const savedConfigData = sessionStorage.getItem(configDataKey);
    if (savedConfigData) {
      this._configContext = JSON.parse(savedConfigData);
    }
  }

  setConfigContext(configContext?: any) {
    this._configContext = configContext || null;

    if (configContext) {
      sessionStorage.setItem(configDataKey, JSON.stringify(configContext));
    } else {
      sessionStorage.removeItem(configDataKey);
    }
  }

  get ConfigContext(): any | null {
    return this._configContext;
  }

  SetLocal(Key: string, localContext: any) {
    this._configContext = localContext || null;

    if (localContext) {
      sessionStorage.setItem(Key, JSON.stringify(localContext));
    } else {
      sessionStorage.removeItem(Key);
    }
  }

  GetLocal(Key: string) {
    const savedLocalData = sessionStorage.getItem(Key);
    let _Value = null;
    if (savedLocalData) {
      _Value = JSON.parse(savedLocalData);
    }
    return _Value;
  }

  ResetLocal() {
    this.SetLocal('Frm_Url', '');
  }

  //#endregion
}
