export class Task {
  id;
  title;
  category;
  details;
  startDate;
  endDate;
  status;

  constructor(id, title, category, details, startDate, endDate, status) {
    this.id = id;
    this.title = title;
    this.category = category;
    this.details = details;
    this.startDate = startDate;
    this.endDate = endDate;
    this.status = status;
  }
}
