import { prisma } from '@/utils/prisma'
import { notFound } from 'next/navigation'
import ClientResultUI from './ClientResultUI'

export default async function ResultPage({ params }: { params: { id: string } }) {
  // Fetch the specific pin data from the database using the ID in the URL
  const {id} = await params;
  const pin = await prisma.contentGeneration.findUnique({
    where: { id }
  })

  // If the ID is invalid, show a 404 page
  if (!pin) return notFound()

  // // We pass the data to a Client Component because we need interactivity (the Download button)
  return <ClientResultUI pin={pin} />
}
