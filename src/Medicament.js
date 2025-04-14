export default class Medicament {
  constructor(id, denomination, formepharmaceutique, qte, photo) {
    this._id = id;
    this._denomination = denomination;
    this._formepharmaceutique = formepharmaceutique;
    this._qte = qte;
    this._photo = photo;
  }

  get id() {
    return this._id;
  }
  get denomination() {
    return this._denomination;
  }
  get formepharmaceutique() {
    return this._formepharmaceutique;
  }
  get qte() {
    return this._qte;
  }
  get photo() {
    return this._photo;
  }
  set denomination(newDenom) {
    this._denomination = newDenom;
  }
  set formepharmaceutique(newForme) {
    this._formepharmaceutique = newForme;
  }
  set qte(newQte) {
    this._qte = newQte;
  }
  set photo(newPhoto) {
    this._photo = newPhoto;
  }
  incrementQte() {
    this._qte++;
  }
  decrementQte() {
    if (this._qte > 0) this._qte--;
  }
  display() {
    return `${this._denomination} (${this._formepharmaceutique}) - Qty: ${this._qte}`;
  }
}
