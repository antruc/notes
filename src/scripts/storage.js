const storage = {
  db: [],
  data() {
    return localStorage.getItem('db')
  },
  addItem(id, value) {
    this.db.push({ id: Number(id), value })
    this.saveData()
  },
  saveItem(id, value) {
    // Find the index of the item with the given id.
    const result = this.db.findIndex((i) => {
      return i.id === Number(id)
    })
    this.db[result].value = value
    this.saveData()
  },
  removeItem(id) {
    // Filter out the item with the given id
    const updatedData = this.db.filter((i) => i.id !== Number(id))
    this.db = []
    // Add the remaining items to the database
    updatedData.forEach((i) => this.db.push(i))
    this.saveData()
  },
  saveData() {
    const data = JSON.stringify(this.db)
    localStorage.setItem('db', data)
  },
  importData(data) {
    localStorage.setItem('db', data)
  },
  init() {
    const data = this.data()
    this.db = JSON.parse(data)
  }
}

export default storage
