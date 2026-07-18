"use client"

import { useCallback, useEffect, useState } from "react"
import { useSession } from "next-auth/react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Star, BadgeCheck, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { UserAvatar } from "@/components/common/UserAvatar"
import type { ReviewItem } from "@/types"

const reviewSchema = z.object({
  rating: z.number().int().min(1, "Elige una calificación").max(5),
  comment: z
    .string()
    .min(5, "Cuéntanos un poco más (mínimo 5 caracteres)")
    .max(500, "Máximo 500 caracteres"),
})

type ReviewFormData = z.infer<typeof reviewSchema>

function StarsInput({
  value,
  onChange,
}: {
  value: number
  onChange: (v: number) => void
}) {
  const [hover, setHover] = useState(0)
  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((n) => (
        <button
          key={n}
          type="button"
          onMouseEnter={() => setHover(n)}
          onMouseLeave={() => setHover(0)}
          onClick={() => onChange(n)}
          className="transition-transform hover:scale-110"
        >
          <Star
            className={`h-6 w-6 ${
              n <= (hover || value)
                ? "fill-[#F5B400] text-[#F5B400]"
                : "text-muted-foreground"
            }`}
          />
        </button>
      ))}
    </div>
  )
}

export function ProductReviews({ productId }: { productId: string }) {
  const { data: session } = useSession()
  const [reviews, setReviews] = useState<ReviewItem[]>([])
  const [loading, setLoading] = useState(true)
  const [formError, setFormError] = useState<string | null>(null)
  const [submitted, setSubmitted] = useState(false)

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<ReviewFormData>({
    resolver: zodResolver(reviewSchema),
    defaultValues: { rating: 0, comment: "" },
  })
  const rating = watch("rating")

  const fetchReviews = useCallback(async () => {
    try {
      const res = await fetch(`/api/reviews?productId=${productId}`)
      if (res.ok) setReviews(await res.json())
    } finally {
      setLoading(false)
    }
  }, [productId])

  useEffect(() => {
    fetchReviews()
  }, [fetchReviews])

  const onSubmit = async (data: ReviewFormData) => {
    setFormError(null)
    const res = await fetch("/api/reviews", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ productId, ...data, images: [] }),
    })
    if (!res.ok) {
      const result = await res.json().catch(() => null)
      setFormError(result?.error ?? "No se pudo guardar la reseña")
      return
    }
    setSubmitted(true)
    await fetchReviews()
  }

  const average =
    reviews.length > 0
      ? reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length
      : 0
  const distribution = [5, 4, 3, 2, 1].map((star) => ({
    star,
    count: reviews.filter((r) => r.rating === star).length,
  }))

  const myUsername = session?.user?.username
  const myReview = myUsername
    ? reviews.find((r) => r.user.username === myUsername)
    : undefined

  return (
    <section className="mt-16">
      <h2 className="mb-6 font-display text-3xl uppercase tracking-wide">
        Calificaciones y Reseñas
      </h2>

      {loading ? (
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Loader2 className="h-4 w-4 animate-spin" /> Cargando reseñas...
        </div>
      ) : (
        <div className="grid gap-8 lg:grid-cols-[280px_1fr]">
          {/* Resumen de estrellas */}
          <div className="space-y-4">
            <div className="flex items-end gap-2">
              <span className="font-display text-6xl leading-none">
                {average.toFixed(1)}
              </span>
              <div>
                <div className="flex gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-4 w-4 ${
                        i < Math.round(average)
                          ? "fill-[#F5B400] text-[#F5B400]"
                          : "text-muted-foreground"
                      }`}
                    />
                  ))}
                </div>
                <p className="text-xs text-muted-foreground">
                  {reviews.length} {reviews.length === 1 ? "reseña" : "reseñas"}
                </p>
              </div>
            </div>

            <div className="space-y-1.5">
              {distribution.map(({ star, count }) => (
                <div key={star} className="flex items-center gap-2 text-xs">
                  <span className="w-3 text-muted-foreground">{star}</span>
                  <Star className="h-3 w-3 fill-[#F5B400] text-[#F5B400]" />
                  <div className="h-2 flex-1 overflow-hidden rounded-full bg-secondary">
                    <div
                      className="h-full rounded-full bg-[#F5B400]"
                      style={{
                        width:
                          reviews.length > 0
                            ? `${(count / reviews.length) * 100}%`
                            : "0%",
                      }}
                    />
                  </div>
                  <span className="w-4 text-right text-muted-foreground">
                    {count}
                  </span>
                </div>
              ))}
            </div>

            {/* Formulario (solo compradores verificados; el backend valida) */}
            {session?.user ? (
              submitted && !myReview ? (
                <p className="rounded-xl bg-[#E2FBE9] p-3 text-xs font-semibold text-[#1E7E34]">
                  ¡Gracias por tu reseña! ✨
                </p>
              ) : (
                <form
                  onSubmit={handleSubmit(onSubmit)}
                  className="space-y-3 rounded-2xl border border-dashed border-primary/50 p-4"
                >
                  <p className="text-sm font-bold">
                    {myReview ? "Edita tu reseña" : "Deja tu reseña"}
                  </p>
                  <StarsInput
                    value={rating}
                    onChange={(v) =>
                      setValue("rating", v, { shouldValidate: true })
                    }
                  />
                  {errors.rating && (
                    <p className="text-xs text-destructive">
                      {errors.rating.message}
                    </p>
                  )}
                  <Textarea
                    placeholder="¿Qué te pareció la figura? ¿Cómo llegó el paquete?"
                    rows={3}
                    {...register("comment")}
                  />
                  {errors.comment && (
                    <p className="text-xs text-destructive">
                      {errors.comment.message}
                    </p>
                  )}
                  {formError && (
                    <p className="rounded-md bg-destructive/15 p-2 text-xs text-destructive">
                      {formError}
                    </p>
                  )}
                  <Button
                    type="submit"
                    size="sm"
                    className="w-full"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    ) : null}
                    {myReview ? "Actualizar reseña" : "Publicar reseña"}
                  </Button>
                  <p className="text-[10px] text-muted-foreground">
                    Solo los compradores verificados pueden publicar reseñas.
                  </p>
                </form>
              )
            ) : (
              <p className="text-xs text-muted-foreground">
                Inicia sesión y compra este producto para dejar tu reseña.
              </p>
            )}
          </div>

          {/* Listado de opiniones */}
          <div>
            {reviews.length === 0 ? (
              <p className="py-4 text-sm italic text-muted-foreground">
                Aún no hay reseñas para este producto. ¡Sé el primero en
                compartir tu opinión!
              </p>
            ) : (
              <div className="space-y-6">
                {reviews.map((review) => (
                  <div key={review.id} className="border-b border-border pb-6">
                    <div className="mb-2 flex items-center gap-3">
                      <UserAvatar
                        username={review.user.username}
                        avatarFileName={review.user.avatarFileName}
                        size={42}
                      />
                      <div>
                        <h4 className="flex items-center gap-2 text-xs font-bold">
                          @{review.user.username}
                          {review.verifiedPurchase && (
                            <span className="inline-flex items-center gap-1 rounded-full bg-[#E2FBE9] px-2 py-0.5 text-[10px] font-bold text-[#1E7E34]">
                              <BadgeCheck className="h-3 w-3" /> Compra Verificada
                            </span>
                          )}
                        </h4>
                        <div className="mt-0.5 flex items-center gap-1">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              size={12}
                              className={
                                i < review.rating
                                  ? "fill-yellow-400 text-yellow-400"
                                  : "text-gray-200"
                              }
                            />
                          ))}
                        </div>
                      </div>
                      <span className="ml-auto text-[10px] text-muted-foreground">
                        {new Date(review.createdAt).toLocaleDateString("es-PE")}
                      </span>
                    </div>

                    <p className="pl-14 text-sm leading-relaxed text-muted-foreground">
                      {review.comment}
                    </p>

                    {review.images.length > 0 && (
                      <div className="mt-3 flex gap-2 pl-14">
                        {review.images.map((imgUrl, index) => (
                          <a
                            key={index}
                            href={imgUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="relative h-16 w-16 overflow-hidden rounded-xl border bg-secondary transition-opacity hover:opacity-90"
                          >
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                              src={imgUrl}
                              alt="Unboxing del producto"
                              className="h-full w-full object-cover"
                            />
                          </a>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  )
}
