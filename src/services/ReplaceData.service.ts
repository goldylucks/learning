import { toast } from 'react-toastify'
import { INewDataArgs } from '../types'
import { formatDataFromServer } from '../utils/formatDataFromServer'
import learningApi from './api.service'

export default class ReplaceDataService {
  initialDataAttemptCount = 0
  initialDataAttemptLimit = 5
  setupSyncAttemptCount = 0
  setupSyncAttemptLimit = 5
  constructor(public onReplaceData: (data: INewDataArgs) => void) {}

  public init() {
    this.fetchInitialDataInit()
  }

  public refresh() {
    this.fetchInitialData()
  }

  private async fetchInitialDataInit() {
    this.initialDataAttemptCount += 1
    const { error } = await this.fetchInitialData()
    if (!error) return
    this.onFetchInitialDataError(error)
  }

  private async fetchInitialData(): Promise<
    { error: Error } | { error: false }
  > {
    try {
      const { data } = await learningApi.get('/all')
      this.onReplaceData(formatDataFromServer(data))
      return { error: false }
    } catch (error) {
      console.error(error)
      return { error }
    }
  }

  private onFetchInitialDataError(error: Error) {
    if (this.initialDataAttemptCount >= this.initialDataAttemptLimit) {
      toast.error(
        'Failed too many times to initialize data. You can try to reset the DB manually'
      )
      return
    }
    toast.error('Error fetching initial data: ' + error.message)
    setTimeout(() => {
      this.fetchInitialDataInit()
    }, 3000)
  }
}
