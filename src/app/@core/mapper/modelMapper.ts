import { Common } from '../common.service';

const com = new Common('Model Mapper');
export class ModelMapper<T> {
  _propertyMapping: any;
  _target: any;
  constructor(type: { new (): T }) {
    this._target = new type();
    this._propertyMapping = this._target.constructor._propertyMap;
  }

  map(source: any) {
    Object.keys(this._target).forEach((key) => {
      const mappedKey = this._propertyMapping[key];
      if (mappedKey) {
        this._target[key] = source[mappedKey];
      } else {
        this._target[key] = source[key];
      }
    });
    Object.keys(source).forEach((key) => {
      const targetKeys = Object.keys(this._target);
      if (targetKeys.indexOf(key) === -1) {
        if (com.IsDateCol(key)) {
          this._target[key] = com.getDateFrmJSON_T(source[key]);
        } else {
          this._target[key] = source[key];
        }
      }
    });
    return this._target;
  }
}
