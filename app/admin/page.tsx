'use client';
import ButtonLink from '@/components/_core/button-link/button-link';
import Button from '@/components/_core/button/button';
import Card from '@/components/_core/card/card';
import useModal from '@/components/_core/modal/use.modal';
import CreateStoryModal from '@/components/admin/stories/create.modal.story';
import { useStories } from '@/req/use-stories';
import CArray from '@/utils/cArray';
import { CardBody, CardFooter, CardHeader } from '@heroui/react';
import { PlusIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function PanelPage() {
  const { data: stories, isLoading } = useStories();
  const router = useRouter();
  const {
    renderModal: renderCreateStoryModal,
    handleOpenModal: handleOpenCreateStoryModal,
  } = useModal(CreateStoryModal);

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center gap-6 w-fit mx-auto">
        <h1 className="text-3xl font-bold">Stories</h1>
        <Button
          color="primary"
          startContent={<PlusIcon />}
          onPress={handleOpenCreateStoryModal}
        >
          Add new Story
        </Button>
      </div>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {stories?.map((story, index) => (
          <Card
            key={story.id}
            title={story.title}
            className="p-4 bg-white rounded shadow-md"
          >
            <CardHeader>
              <ButtonLink
                className="font-bold text-2xl w-full"
                onPress={() => router.push('/admin/stories/edit/' + story.id)}
              >
                {index + 1}. {story.title}
              </ButtonLink>
            </CardHeader>
            <CardBody>{story.description}</CardBody>
            <CardFooter>
              <ButtonLink
                className="font-bold text-2xl w-full"
                onPress={() => router.push('/game/stories/play/' + story.id)}
              >
                Play
              </ButtonLink>
            </CardFooter>
          </Card>
        ))}
        {isLoading ? 'loading...' : CArray.isEmpty(stories) && 'no story find'}
      </div>
      {renderCreateStoryModal}
    </div>
  );
}
