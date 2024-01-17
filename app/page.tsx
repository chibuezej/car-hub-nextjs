import { CarCard, CustomFilter, SearchBar } from '@/components'
import Hero from '@/components/Hero'
import { fetchCars } from '@/utils'

export default async function Home({searchParams}) {
  const allCars = await fetchCars({
    manufacturer: searchParams.manufacturer || '',
    year: searchParams.year || 2024,
    fuel: searchParams.fuel || '',
    limit: searchParams.limit || 10,
    model: searchParams.model || '',
  });

  const isDataEmpty = !Array(allCars) || allCars.length < 1 || !allCars
  return (
    <main className='overflow-hidden'>
      <Hero />
      <div className='mt-12 padding-x padding-y max-width' id='discover'>
      <div className='home__text-container'>
        <h1 className='text-4xl font-extrabold'>Meriles Car Catalogue</h1>
        <p>Explore the cars you might like</p>
      </div>
      <div className='home__filters'>
    <SearchBar />
    <div className='home__filter-container'>
      <CustomFilter title="fuel" />
      <CustomFilter title="year" />
    </div>
      </div>
      {!isDataEmpty ? (
        <section className='home__cars-wrapper'>
     {allCars?.map((car: any) => (
      <CarCard car={car} />
     ))}
        </section>
      ): (
        <div className='home__error-container'>
          <h2 className='text-black text-xl'>Oops, your village people no want make you buy car</h2>
          <p>{allCars?.message}</p>
        </div>
      )}
      </div>
      </main>
  )
}
