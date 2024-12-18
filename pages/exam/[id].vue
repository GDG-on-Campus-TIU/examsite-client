<script lang="ts" setup>
import { useToast } from "@/components/ui/toast/use-toast";
import type { QuestionType } from "~/types";
const { toast } = useToast();

const router = useRouter();
const route = useRoute();

const { questions } = await $fetch<{ questions: QuestionType[] }>(
  `/api/questions/${route.params.id}`
);
const user = userStore();

const tabSwitchAttempts = ref(0);
const windowSwitchAttempts = ref(0);

const switchDetector = ref(false);

const selectedChoices = ref<{ questionId: string; choiceIndex: number }[]>([]);

const handleChoiceChange = (questionId: string, choiceIndex: number) => {
  const existingChoice = selectedChoices.value.find(
    (item) => item.questionId === questionId
  );

  if (existingChoice) {
    // Update the existing choice
    existingChoice.choiceIndex = choiceIndex;
  } else {
    // Add a new choice
    selectedChoices.value.push({
      questionId: questionId,
      choiceIndex: choiceIndex,
    });
  }
};

const decreaseAttempts = async () => {
  if (!questions) {
    return;
  }

  const token = useCookie("token").value;

  await $fetch("/api/questions/decrease-attempt", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  user.attempts = user.attempts - 1;

  if (user.attempts < 1) {
    router.push("/");
  }
};

const submitExam = async () => {
  const token = useCookie("token").value;

  await $fetch("/api/questions/decrease-attempt", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  user.attempts = user.attempts - 1;

  try {
    await $fetch("/api/questions/submit-exam", {
      body: selectedChoices.value,
      method: "POST",
      headers: {
        Authorization: `Bearer ${useCookie("token").value}`,
      },
    });

    toast({
      title: "Exam successfully submitted!",
      description: "Your exam has been submitted. You can now log out  ",
    });

    router.push("/");
  } catch (error) {
    toast({
      title: "Seems like you have already submitted your exam",
      description: "Please go to the admin if you think this is a mistake",
      variant: "destructive",
    });
  }
};

watch(tabSwitchAttempts, () => {
  if (!questions) {
    return;
  }
  if (tabSwitchAttempts.value >= 2) {
    decreaseAttempts();
  }
});

watch(windowSwitchAttempts, () => {
  if (!questions) {
    return;
  }

  if (windowSwitchAttempts.value >= 2) {
    decreaseAttempts();
  }
});

onMounted(async () => {
  document.addEventListener("visibilitychange", async () => {
    if (!questions) {
      return;
    }

    if (document.visibilityState === "hidden") {
      tabSwitchAttempts.value++;
      switchDetector.value = true;
    }
  });

  window.addEventListener("blur", async () => {
    if (!questions) {
      return;
    }

    windowSwitchAttempts.value++;
    switchDetector.value = true;
  });
});

// Page Head
useHead({
  title: "SOF GenAI Exam - 1",
});
</script>

<template>
  <Card v-if="questions.length > 0">
    <CardHeader>
      You have
      {{ `${user.attempts} attempt${user.attempts > 1 ? "s" : ""}` }} left
    </CardHeader>
  </Card>

  <Card v-if="switchDetector" class="mt-5 bg-red-500">
    <CardHeader class="flex flex-row end-1">
      <p>
        <Icon name="mdi:information" class="mr-2 w-5 h-5" />
      </p>
      Window / tab switch detected. Doing it once again would submit the exam.
    </CardHeader>
  </Card>

  <Form v-if="questions !== null">
    <div v-for="(question, index) in questions" :key="question.examId">
      <FormItem>
        <Card class="mb-4">
          <CardHeader>
            <CardTitle class="text-2xl">{{
              `${index + 1}. ${question.question}`
            }}</CardTitle>
          </CardHeader>
          <CardContent>
            <!-- RadioGroup for choices of each question -->
            <RadioGroup :name="`question-${index}`">
              <div
                v-for="choice in question.choices"
                :key="choice.index"
                class="flex items-center space-x-2"
              >
                <RadioGroupItem
                  :id="choice.index.toString()"
                  :value="choice.index.toString()"
                  @click="handleChoiceChange(question._id, choice.index)"
                />
                <Label>
                  {{ choice.choice }}
                </Label>
              </div>
            </RadioGroup>
          </CardContent>
        </Card>
      </FormItem>
    </div>

    <Card v-if="!questions">
      <CardHeader>
        <CardTitle>No questions found in this exam</CardTitle>
      </CardHeader>

      <CardFooter>
        <nuxt-link to="/">
          <Button variant="link">
            <Icon name="mdi:arrow-left" />
            Go Back
          </Button>
        </nuxt-link>
      </CardFooter>
    </Card>

    <!-- Submit Button -->
    <Button v-if="questions" @click.prevent="submitExam()">
      Submit Answers
    </Button>
  </Form>
</template>
