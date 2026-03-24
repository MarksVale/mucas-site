import { createClient } from 'next-sanity'
import { projectId, dataset, apiVersion } from './env'

// Only create a real client if Sanity is configured
export const sanityClient = projectId
  ? createClient({ projectId, dataset, apiVersion, useCdn: true })
  : null
