
interface IUser {
  email: string,
  password: string,
  confirm_password: string
}

interface SignUpResponse {
  email: string
  id: number
}

interface IUserLinks {
  count: number,
  next: null | number,
  prev: null | number,
  results: IUserLink[]
}

interface IUserLink {
  // url: string,
  id: number,
  short_link: string,
  long_link: string,
  date_created: string,
  last_visited_date: string,
  visit_count: number,
  analytic: {
    current_month: CurrentMotnh[],
  // today_total: [],
  // "today_by_hour": [],
  // "this_week_by_day": [],
  other_analytic: {
    Browser: {
      [key: string]: number
      // "Firefox": 2
    },
    OS: {
      // "Windows 10": 2
      [key: string]: number
    },
    Device: {
      // "PC": 2
      [key: string]: number
    },
    // "Referer": {},
    Country: {
      [key: string]: number
      
    }
  }
},


}

type CurrentMonth = {
  date: string,
  count__sum: number
}