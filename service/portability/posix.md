# POSIX 支持

The Portable Operating System Interface (POSIX) is a family of standards specified by the IEEE Computer Society for maintaining compatibility between operating systems. Zephyr implements a subset of the embedded profiles PSE51 and PSE52, and BSD Sockets API.

可移植操作系统接口 (POSIX) 是由 IEEE 计算机组织指定一些列的标准，用于维护操作系统之间的兼容性。Zephyr 实现了嵌入式 PSE51 和 PSE52 以及 BSD Sockets API 的子集。

With the POSIX support available in Zephyr, an existing POSIX compliant application can be ported to run on the Zephyr kernel, and therefore leverage Zephyr features and functionality. Additionally, a library designed for use with POSIX threading compatible operating systems can be ported to Zephyr kernel based applications with minimal or no changes.

有了 Zephyr 支持的 POSIX，可以将现有的 POSIX 兼容的应用程序移植到 Zephyr 内核上运行，从而利用 Zephyr 特性和功能。此外，设计用于与 POSIX 线程兼容的操作系统的库可以移植到基于 Zephyr 内核的应用程序，并且仅需要少量或无需修改。

![](../images/posix.svg)

The POSIX API subset is an increasingly popular OSAL (operating system abstraction layer) for IoT and embedded applications, as can be seen in Zephyr, AWS:FreeRTOS, TI-RTOS, and NuttX.

POSIX API 子集是一个越来越流行的 OSAL (操作系统抽象层)，用于 IoT 和嵌入式应用程序，可以在 Zephyr、AWS:FreeRTOS、TI-RTOS 和 NuttX 中看到。

Benefits of POSIX support in Zephyr include:

Zephyr 支持 POSIX 的优点包括：

- Offering a familiar API to non-embedded programmers | especially from Linux <br /> 为非嵌入式程序员提供熟悉的 API，尤其是 Linux 程序员
- Enabling reuse (portability) of existing libraries based on POSIX APIs <br /> 支持重用 (可移植性) 基于 POSIX API 的现有库
- Providing an efficient API subset appropriate for small (MCU) embedded systems <br /> 提供适用与小型 (MCU) 嵌入式系统的高效 API 子集

## 系统概览

### 功能单元

The system profile is defined in terms of component profiles that specify Units of Functionality that can be combined to realize the application platform. A Unit of Functionality is a defined set of services which can be implemented. If implemented, the standard prescribes that all services in the Unit must be implemented.

系统概要是由组件概要定义的，它指定了可以组合实现应用平台的功能单元。功能单元是一组定义好的可以实现的服务。如果实现，标准要求所有单元服务都必须实现。

A Minimal Realtime System Profile implementation must support the following Units of Functionality as defined in IEEE Std. 1003.1 (also referred to as POSIX.1-2017).

最小实时系统概要实现必须支持 IEEE Std 中定义的以下功能单元。1003.1(亦称 POSIX.1-2017)。

| 需求 | 支持 | 备注 |
| ---- | ---- | ---- |
| POSIX_C_LANG_JUMP |  |  |
| POSIX_C_LANG_SUPPORT | yes |  |
| POSIX_DEVICE_IO |  |  |
| POSIX_FILE_LOCKING |  |  |
| POSIX_SIGNALS |  |  |
| POSIX_SINGLE_PROCESS |  |  |
| POSIX_THREADS_BASE | yes |  |
| XSI_THREAD_MUTEX_EXT | yes |  |
| XSI_THREADS_EXT | yes |  |

### 选项要求

An implementation supporting the Minimal Realtime System Profile must support the POSIX.1 Option Requirements which are defined in the standard. Options Requirements are used for further sub-profiling within the units of functionality: they further define the functional behavior of the system service (normally adding extra functionality). Depending on the profile to which the POSIX implementation complies,parameters and/or the precise functionality of certain services may differ.

支持最小实时系统配置文件的实现必须支持标准中定义的 POSIX.1 选项要求。选项需求用于功能单元内的进一步子分析：它们进一步定义系统服务的功能行为（通常添加额外的功能）。根据 POSIX 实现所遵循的配置文件，某些服务的参数和/或精确功能可能会有所不同。

The following list shows the option requirements that are implemented in Zephyr.

以下列表显示了在 Zephyr 中实现的选项要求。

| 需求 | 支持 |
| ---- | ---- |
| _POSIX_CLOCK_SELECTION |  |
| _POSIX_FSYNC |  |
| _POSIX_MEMLOCK |  |
| _POSIX_MEMLOCK_RANGE |  |
| _POSIX_MONOTONIC_CLOCK |  |
| _POSIX_NO_TRUNC |  |
| _POSIX_REALTIME_SIGNALS |  |
| _POSIX_SEMAPHORES | yes |
| _POSIX_SHARED_MEMORY_OBJECTS |  |
| _POSIX_SYNCHRONIZED_IO |  |
| _POSIX_THREAD_ATTR_STACKADDR |  |
| _POSIX_THREAD_ATTR_STACKSIZE |  |
| _POSIX_THREAD_CPUTIME |  |
| _POSIX_THREAD_PRIO_INHERIT | yes |
| _POSIX_THREAD_PRIO_PROTECT |  |
| _POSIX_THREAD_PRIORITY_SCHEDULING | yes |
| _POSIX_THREAD_SPORADIC_SERVER |  |
| _POSIX_TIMEOUTS |  |
| _POSIX_TIMERS |  |
| _POSIX2_C_DEV |  |
| _POSIX2_SW_DEV |  |

## 功能单元 

This section describes the Units of Functionality (fixed sets of interfaces) which are implemented (partially or completely) in Zephyr. Please refer to the standard for a full description of each listed interface.

本节描述在 Zephyr 中（部分或者全部）实现的功能单元（固定的接口集）。请参考标准中的每个接口的完整描述。

### POSIX_THREADS_BASE

The basic assumption in this profile is that the system consists of a single (implicit) process with multiple threads. Therefore, the standard requires all basic thread services, except those related to multiple processes.

本配置文件的基本假设是系统由一个单一的（隐式）进程和多个线程组成。因此，标准要求所有基本线程服务，但与多进程相关的除外。

| API | 支持 |
| ---- | ---- |
| pthread_atfork() | yes |
| pthread_attr_destroy() | yes |
| pthread_attr_getdetachstate() | yes |
| pthread_attr_getschedparam() | yes |
| pthread_attr_init() | yes |
| pthread_attr_setdetachstate() | yes |
| pthread_attr_setschedparam() | yes |
| pthread_cancel() | yes |
| pthread_cleanup_pop() |  |
| pthread_cleanup_push() |  |
| pthread_cond_broadcast() | yes |
| pthread_cond_destroy() |  |
| pthread_cond_init() | yes |
| pthread_cond_signal() | yes |
| pthread_cond_timedwait() | yes |
| pthread_cond_wait() | yes |
| pthread_condattr_destroy() |  |
| pthread_condattr_init() |  |
| pthread_create() | yes |
| pthread_detach() | yes |
| pthread_equal() |  |
| pthread_exit() | yes |
| pthread_getspecific() | yes |
| pthread_join() | yes |
| pthread_key_create() | yes |
| pthread_key_delete() | yes |
| pthread_kill() | yes |
| pthread_mutex_destroy() | yes |
| pthread_mutex_init() | yes |
| pthread_mutex_lock() | yes |
| pthread_mutex_trylock() | yes |
| pthread_mutex_unlock() | yes |
| pthread_mutexattr_destroy() |  |
| pthread_mutexattr_init() |  |
| pthread_once() | yes |
| pthread_self() | yes |
| pthread_setcalcelstate() |  |
| pthread_setcanceltype() |  |
| pthread_setspecific() | yes |
| pthread_sigmask() |  |
| pthread_testcancel() |  |

### XSI_THREAD_EXT

The XSI_THREADS_EXT Unit of Functionality is required because it provides functions to control a thread’s stack. This is considered useful for any real-time application.

XSI_THREADS_EXT 功能单元是必需的，因为它提供了控制线程栈的函数。这对于任何实时应用程序是有用的。

This table lists service support status in Zephyr:

本表列出了 Zephyr 中的服务支持状态：

| API | 支持 |
| ---- | ---- |
| pthread_attr_getguardsize() |  |
| pthread_attr_getstack() | yes |
| pthread_attr_setguardsize() |  |
| pthread_attr_setstack() | yes |
| pthread_getconcurrency() |  |
| pthread_setconcurrency() |  |

### XSI_THREAD_MUTEX_EXT

The XSI_THREAD_MUTEX_EXT Unit of Functionality is required because it has options for controlling the behavior of mutexes under erroneous application use.

XSI_THREAD_MUTEX_EXT 功能单元是必需的，因为它具有在错误的应用程序使用下控制互斥锁行为的选项。

This table lists service support status in Zephyr:

下表列出了 Zephyr 中的服务支持状态：

| API | 支持 |
| ---- | ---- |
| pthread_mutexattr_gettype() | yes |
| pthread_mutexattr_settype() | yes |

### POSIX_C_LANG_SUPPORT

The POSIX_C_LANG_SUPPORT Unit of Functionality contains the general ISO C Library.

POSIX_C_LANG_SUPPORT 功能单元包含通用 ISO C 库。

This is implemented as part of the minimal C library available in Zephyr.

这是作为 Zephyr 中可用的最小 C 库的一部分实现的。

| API | 支持 |
| ---- | ---- |
| abs() | yes |
| asctime() |
| asctime_r() |
| atof() |
| atoi() | yes |
| atol() |
| atoll() |
| bsearch() | yes |
| calloc() | yes |
| ctime() |
| ctime_r() |
| difftime() |
| div() |
| feclearexcept() |
| fegetenv() |
| fegetexceptflag() |
| fegetround() |
| feholdexcept() |
| feraiseexcept() |
| fesetenv() |
| fesetexceptflag() |
| fesetround() |
| fetestexcept() |
| feupdateenv() |
| free() | yes |
| gmtime() | yes |
| gmtime_r() | yes |
| imaxabs() |
| imaxdiv() |
| isalnum() | yes |
| isalpha() | yes |
| isblank() |
| iscntrl() |
| isdigit() | yes |
| isgraph() | yes |
| islower() |
| isprint() | yes |
| ispunct() |
| isspace() | yes |
| isupper() | yes |
| isxdigit() | yes |
| labs() | yes |
| ldiv() |
| llabs() | yes |
| lldiv() |
| localeconv() |
| localtime() | yes |
| localtime_r() |
| malloc() | yes |
| memchr() | yes |
| memcmp() | yes |
| memcpy() | yes |
| memmove() | yes |
| memset() | yes |
| mktime() | yes |
| qsort() |
| rand() | yes |
| rand_r() |
| realloc() | yes |
| setlocale() |
| snprintf() | yes |
| sprintf() | yes |
| srand() | yes |
| sscanf() |
| strcat() | yes |
| strchr() | yes |
| strcmp() | yes |
| strcoll() |
| strcpy() | yes |
| strcspn() |
| strerror() | yes |
| strerror_r() | yes |
| strftime() |
| strlen() | yes |
| strncat() | yes |
| strncmp() | yes |
| strncpy() | yes |
| strpbrk() |
| strrchr() | yes |
| strspn() |
| strstr() | yes |
| strtod() |
| strtof() |
| strtoimax() |
| strtok() |
| strtok_r() | yes |
| strtol() | yes |
| strtold() |
| strtoll() | yes |
| strtoul() | yes |
| strtoull() | yes |
| strtoumax() |
| strxfrm() |
| time() | yes |
| tolower() | yes |
| toupper() | yes |
| tzname() |
| tzset() |
| va_arg() |
| va_copy() |
| va_end() |
| va_start() |
| vsnprintf() | yes |
| vsprintf() | yes |
| vsscanf() |  |

### POSIX_SINGLE_PROCESS

The POSIX_SINGLE_PROCESS Unit of Functionality contains services for single process applications.

POSIX_SINGLE_PROCESS 功能单元包含用于单进程应用程序的服务。

| API | 支持 |
| ---- | ---- |
| confstr() |  |
| environ |  |
| errno |  |
| getenv() |  |
| setenv() |  |
| sysconf() |  |
| uname() |  |
| unsetenv() |  |

### POSIX_SIGNALS

Signal services are a basic mechanism within POSIX-based systems and are required for error and event handling.

信号服务是基于 POSIX 的系统中的基本机制，是错误和事件处理所必需的。

| API | 支持 |
| ---- | ---- |
| abort() | yes |
| alarm() |  |
| kill() |  |
| pause() |  |
| raise() |  |
| sigaction() |  |
| igaddset() |  |
| sigdelset() |  |
| sigemptyset() |  |
| sigfillset() |  |
| igismember() |  |
| signal() |  |
| sigpending() |  |
| sigprocmask() |  |
| igsuspend() |  |
| sigwait() |  |

### POSIX_DEVICE_IO

| API | 支持 |
| ---- | ---- |
| flockfile() |
| ftrylockfile() |
| funlockfile() |
| getc_unlocked() |
| getchar_unlocked() |
| putc_unlocked() |
| putchar_unlocked() |
| clearerr() |
| close() |
| fclose() |
| fdopen() |
| feof() |
| ferror() |
| fflush() |
| fgetc() |
| fgets() |
| fileno() |
| fopen() |
| fprintf() | yes |
| fputc() | yes |
| fputs() | yes |
| fread() |
| freopen() |
| fscanf() |
| fwrite() | yes |
| getc() |
| getchar() |
| gets() |
| open() | yes |
| perror() | yes |
| printf() | yes |
| putc() | yes |
| putchar() |
| puts() | yes |
| read() | yes |
| scanf() |
| setbuf() |
| etvbuf() |
| stderr |
| stdin |
| stdout |
| ungetc() |
| vfprintf() | yes |
| vfscanf() |
| vprintf() | yes |
| vscanf() |
| write() |