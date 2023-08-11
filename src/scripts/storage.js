const storage = {
  db: [],
  data() {
    return localStorage.getItem('db')
  },
  addItem(id, value) {
    let item = new Object()
    item['id'] = id
    item['value'] = value
    this.db.push(item)
    this.saveData()
  },
  saveItem(id, value) {
    let data = this.db
    let result = data.findIndex((i) => {
      return i.id === parseInt(id)
    })
    data[result].value = value
    this.saveData()
  },
  removeItem(id) {
    let updatedData = this.db.filter((i) => i.id !== parseInt(id))
    this.db = []
    updatedData.forEach((i) => this.db.push(i))
    this.saveData()
  },
  saveData() {
    let data = JSON.stringify(this.db)
    localStorage.setItem('db', data)
  },
  importData(data) {
    localStorage.setItem('db', data)
  },
  init() {
    let data = this.data()
    this.db = JSON.parse(data)
  }
}

export default storage
