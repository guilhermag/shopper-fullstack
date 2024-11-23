class RideService {
  async estimate(origin: string, destination: string) {
    console.log(process.env.GOOGLE_API_KEY);
  }
}

export default new RideService();
