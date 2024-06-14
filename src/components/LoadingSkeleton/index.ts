import ObSkeleton from '@/components/LoadingSkeleton/src/Skeleton.vue'
import ObSkeletonTheme from '@/components/LoadingSkeleton/src/SkeletonTheme.vue'
import type { App } from 'vue'

export const registerObSkeleton = (app: App): void => {
  if (ObSkeleton.name != null) {
    app.component(ObSkeleton.name, ObSkeleton)
  }
  if (ObSkeletonTheme.name != null) {
    app.component(ObSkeletonTheme.name, ObSkeletonTheme)
  }
}
