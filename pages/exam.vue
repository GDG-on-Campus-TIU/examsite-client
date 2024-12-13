<script lang="ts" setup>
const questions = await $fetch("/api/questions");
const router = useRouter();
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
    body: selectedChoices.value,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  user.attempts = user.attempts - 1;

  router.push("/");
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
</script>

<template>
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
        <CardTitle>Exam hasn't started yet</CardTitle>
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
    <Button v-if="questions" @click="decreaseAttempts()">
      Submit Answers
    </Button>
  </Form>
</template>
