<script setup lang="ts">
const user = userStore();

useHead({
  title: "Techno India University - Exam Portal",
});

const exams = ref<ExamType[]>([]);

try {
  const allExams = await $fetch<{ exams: ExamType[] }>("/api/exam/get-all", {
    headers: {
      Authorization: `Bearer ${useCookie("token").value}`,
    },
  });

  exams.value = allExams.exams;
} catch (error) {
  useRouter().push("/login");
}
</script>

<template>
  <div class="flex flex-col items-center justify-center h-full space-y-8">
    <!-- Attempted Exams Section -->
    <!-- <div class="w-full">
      <Card>
        <CardHeader>
          <CardTitle class="text-2xl">Attempted Exams</CardTitle>
          <CardDescription> Exams you have already attempted. </CardDescription>
        </CardHeader>

        <CardContent>
          <ul class="list-disc pl-5 text-muted-foreground">
            <li>Math Test - Score: 18/20</li>
            <li>Science Quiz - Score: 15/20</li>
            <li>History Exam - Score: 12/20</li>
          </ul>
        </CardContent>

        <CardFooter class="flex justify-end">
          Placeholder for future actions
        </CardFooter>
      </Card>
    </div> -->

    <!-- Upcoming Exams Section -->

    <div class="w-full">
      <Card class="my-5 bg-red-500">
        <CardHeader class="flex flex-row end-1">
          <p>
            <Icon name="mdi:information" class="mr-2 w-5 h-5" />
          </p>
          Note that switching tabs would automatically submit the exam
        </CardHeader>
      </Card>

      <Card class="mt-4" v-for="exam in exams">
        <CardHeader>
          <CardTitle class="text-2xl">{{ exam.name }}</CardTitle>
          <CardDescription> Full Marks: {{ exam.totalMarks }} </CardDescription>
        </CardHeader>

        <CardContent>
          <p>Test your knowledge and skills in this internal examination</p>
        </CardContent>

        <CardFooter class="flex justify-end">
          <!-- Button -->
          <Button
            variant="link"
            v-if="user?.attempts > 0"
            :disabled="exam.started === 'NO'"
          >
            <nuxt-link :to="`/exam/${exam._id}`">Attempt Quiz</nuxt-link>
            <Icon name="mdi:arrow-right" />
          </Button>

          <HoverCard>
            <HoverCardTrigger>
              <Button v-if="user?.attempts === 0" variant="link">
                No Attempts Left
                <p>
                  <Icon name="mdi:error" />
                </p>
              </Button>
            </HoverCardTrigger>
            <HoverCardContent>
              Seems like you have exhausted all of your exam attempts. Please
              contact admin if you think this is a mistake.
            </HoverCardContent>
          </HoverCard>
        </CardFooter>
      </Card>
    </div>
  </div>
</template>
