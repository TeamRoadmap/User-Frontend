import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import {
  Box,
  Button,
  Flex,
  Grid,
  Heading,
  Stack,
  Text,
  Skeleton,
  useColorModeValue,
  Link,
  Code,
} from "@chakra-ui/react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import CourseLayout from "../../../../dashboard/course/course-layout";

import parse, {
  attributesToProps,
  domToReact,
  Element,
} from "html-react-parser";

import Image from "next/image";

import Head from "next/head";
import { async } from "@firebase/util";
import { useTransform, useScroll } from "framer-motion";

export const Course = () => {
  const notify = () => toast("Saved");
  const { token } = useSelector((state) => state.user);
  const { sectionData } = useSelector((state) => state.course);
  const [courseDetail, setCourseDetail] = useState();
  const [scrollProgress, setScrollProgress] = useState();
  const [error, setError] = useState();
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const router = useRouter();
  const { course } = router.query;
  const contentColor = useColorModeValue("gray.700", "gray.200");
  const { scrollYProgress } = useScroll();

  const linkColor = useColorModeValue("purple.500", "purple.200");
  const codeColor = useColorModeValue("gray.200", "gray.700");

  const getSectionCompletion = async () => {
    try {
      const res = await axios.get(
        `https://roadmap-backend-host.herokuapp.com/api/v1/course/${course}/progress`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      dispatch({
        type: "course/setSectionProgress",
        payload: res.data.data.progress,
      });
    } catch (err) {
      console.log(err);
    }
  };

  const setSectionCompletion = async () => {
    if (sectionData.type === "section") {
      if (scrollProgress !== undefined && scrollProgress > 80) {
        try {
          const res = await axios.post(
            `https://roadmap-backend-host.herokuapp.com/api/v1/course/${course}/progress`,
            {
              section_id: sectionData.id,
            },
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
        } catch (err) {
          console.log(err);
        }
      }
    }
    if (sectionData.type === "subsection") {
      if (scrollProgress !== undefined && scrollProgress > 80) {
        try {
          const res = await axios.post(
            `https://roadmap-backend-host.herokuapp.com/api/v1/course/${course}/progress`,
            {
              subsection_id: sectionData.id,
            },
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          getSectionCompletion();
        } catch (err) {
          console.log(err);
        }
      }
    }
  };

  const yRange = useTransform(scrollYProgress, [0, 1], [0, 100]);

  useEffect(() => {
    let ignore = false;
    if (yRange.current === 100) {
      if (!ignore) {
        setScrollProgress(Math.trunc(yRange.current));
      }
    } else {
      yRange.onChange((v) => {
        if (!ignore) {
          setScrollProgress(Math.trunc(yRange.current));
        }
      });
    }
    if (!ignore) {
      setSectionCompletion();
    }

    return () => {
      ignore = true;
    };
  }, [sectionData]);

  const options = {
    replace: (domNode) => {
      // Look for an img tag and replace it with Image.
      if (domNode instanceof Element && domNode.name === "img") {
        const { src, alt } = domNode.attribs;

        return (
          <Image
            src={`${src}`}
            width={`200px`}
            height={`200px`}
            alt={alt}
            layout="intrinsic"
            objectFit="cover"
          />
        );
      }
      if (domNode instanceof Element && domNode.name === "h1") {
        const props = attributesToProps(domNode.attribs);
        return (
          <Heading
            as="h1"
            fontSize="1.2rem"
            color={contentColor}
          >
            {domNode.children[0].data}
          </Heading>
        );
      }
      if (domNode instanceof Element && domNode.name === "h2") {
        const props = attributesToProps(domNode.attribs);
        return (
          <Heading
            as="h1"
            fontSize="1rem"
            color={contentColor}
          >
            {domNode.children[0].data}
          </Heading>
        );
      }
      if (domNode instanceof Element && domNode.name === "a") {
        const props = attributesToProps(domNode.attribs);
        return (
          <Link
            {...props}
            as="a"
            fontSize="1rem"
            color={linkColor}
          >
            {domNode.children[0].data}
          </Link>
        );
      }
      if (domNode instanceof Element && domNode.name === "pre") {
        const props = attributesToProps(domNode.attribs);
        return (
          <Code
            bg={codeColor}
            px="6"
            py="4"
            rounded="8"
          >
            {domToReact(domNode.children)}
          </Code>
        );
      }
      if (domNode instanceof Element && domNode.name === "iframe") {
        const { src, alt } = domNode.attribs;
        return (
          <iframe
            width="260"
            src={`${src}`}
          >
            {domToReact(domNode.children)}
          </iframe>
        );
      }
    },
  };

  const getCourseDetail = async () => {
    setLoading(true);
    try {
      const res = await axios.get(
        `https://roadmap-backend-host.herokuapp.com/api/v1/course/${course}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setCourseDetail(res.data.data);
      dispatch({ type: "course/setCourse", payload: res.data.data.course });
      dispatch({ type: "course/setSection", payload: res.data.data.sections });
      // setCourseDetail(res.data.data.courses);
      setLoading(false);
    } catch (err) {
      setError("error occured");
    }

    // dispatch({ type: "course/setCourse", payload: res.data });
  };

  // const updateSection = async () => {
  //   const res = await axios.patch(
  //     `https://e2b008aa-8ef7-4125-8063-532dfb7d0c2e.mock.pstmn.io/getSection?id=${editorSection.id}`,
  //     {
  //       title: editorSection.title,
  //       description: editorSection.description,
  //       content: editorSection.content,
  //     }
  //   );
  //   notify();
  // };
  useEffect(() => {
    getCourseDetail();
    dispatch({ type: "course/resetSection" });
  }, []);

  return (
    <CourseLayout data={courseDetail}>
      <Flex
        m={{ sm: "2", md: "6" }}
        gap="4"
        direction="column"
        align="left"
      >
        <Text
          fontSize={{ sm: "2xl", md: "3xl" }}
          variant="h1"
          casing="capitalize"
          fontWeight="600"
        >
          Course Title- {courseDetail?.course?.title}
        </Text>
        <Text
          fontSize={{ sm: "lg", md: "xl" }}
          variant="h1"
          casing="capitalize"
          fontWeight="400"
        >
          Course description -{courseDetail?.course?.description}
        </Text>
      </Flex>
      <Box
        my={{ sm: "6", md: "12" }}
        mx={{ sm: "0", md: "6" }}
        py="8"
        px={{ sm: "0", md: "8" }}
      >
        {sectionData == "" && (
          <Text
            fontSize="xl"
            textAlign="left"
          >
            Start exploring the course through sections!
          </Text>
        )}
        {sectionData != "" && (
          <>
            <Flex
              gap="6"
              direction="column"
            >
              <Flex
                gap="2"
                direction="column"
              >
                <Text
                  as="h1"
                  fontSize={{ sm: "1rem", md: "1.2rem" }}
                  fontWeight="700"
                >
                  {" "}
                  Title: {sectionData?.title}
                </Text>
                <Text
                  as="h1"
                  fontSize={{ sm: "1rem", md: "1.2rem" }}
                  fontWeight="400"
                >
                  Description: {sectionData?.description}
                </Text>
              </Flex>
              <Flex
                gap="6"
                direction="column"
              >
                <Box
                  my="2"
                  bg="white"
                  rounded="8"
                  _dark={{ bg: "gray.900" }}
                  p="8"
                >
                  {parse(`${sectionData?.content}`, options)}
                </Box>
              </Flex>
            </Flex>
          </>
        )}
      </Box>
    </CourseLayout>
  );
};;;;;

export default Course;

export { getServerSideProps } from "../../../../shared/lib/chakra";
