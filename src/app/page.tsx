import { Button, Text } from "@/components";
import { ROUTES } from "@/constants/routes/routes";
import Image from "next/image";
import Link from "next/link";

export default async function HomePage() {
  return (
    <div className="min-h-screen flex items-center justify-around flex-col px-4 sm:px-6 md:px-8 py-6 sm:py-10 gap-6 sm:gap-8">
      <Image
        src="/image-home.png"
        alt="Imagem de home"
        width={345}
        height={373}
        className="w-full h-auto"
      />
      <div className="flex flex-col items-start justify-start gap-3 sm:gap-4 w-full">
        <Text weight="bold" as="h1" className="text-2xl!">
          Eduque suas finanças agora
        </Text>
        <Text variant="caption" weight="normal" as="p">
          Controle seus gastos, aprenda a investir e evolua com seus colegas.
        </Text>
        <Button variant="test" className="my-10 w-full">
          <Link href={ROUTES.LOGIN} className="text-2xl">
            Iniciar Agora
          </Link>
        </Button>
      </div>
    </div>
  );
}
